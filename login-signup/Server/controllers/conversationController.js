const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const conversationController = {
  async createConversation(req, res) {
    try {
      const { title, participants } = req.body;
      const conversationId = uuidv4();

      await pool.query('START TRANSACTION');

      await pool.query(
        'INSERT INTO conversations (id, title) VALUES (?, ?)',
        [conversationId, title]
      );

      const participantValues = participants.map(userId => [conversationId, userId]);
      await pool.query(
        'INSERT INTO conversation_participants (conversation_id, user_id) VALUES ?',
        [participantValues]
      );

      await pool.query('COMMIT');
      res.status(201).json({ id: conversationId, title });
    } catch (error) {
      await pool.query('ROLLBACK');
      res.status(500).json({ message: 'Error creating conversation', error: error.message });
    }
  },

  async getUserConversations(req, res) {
    try {
      const userId = req.user.user_id;

      const [conversations] = await pool.query(
        `SELECT c.*, 
          GROUP_CONCAT(u.full_name) as participant_names,
          (SELECT COUNT(*) FROM messages m 
           WHERE m.conversation_id = c.id 
           AND m.is_read = false 
           AND m.sender_id != ?) as unread_count
         FROM conversations c
         JOIN conversation_participants cp ON c.id = cp.conversation_id
         JOIN users u ON cp.user_id = u.user_id
         WHERE c.id IN (
           SELECT conversation_id 
           FROM conversation_participants 
           WHERE user_id = ?
         )
         GROUP BY c.id
         ORDER BY c.updated_at DESC`,
        [userId, userId]
      );

      res.json(conversations);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching conversations', error: error.message });
    }
  }
};

module.exports = conversationController;