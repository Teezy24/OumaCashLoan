const pool = require('../config/database');
const { v4: uuidv4 } = require('uuid');

const messageController = {
  async createMessage(req, res) {
    try {
      const { conversation_id, message_text } = req.body;
      const sender_id = req.user.user_id;
      const messageId = uuidv4();

      const [result] = await pool.query(
        'INSERT INTO messages (id, conversation_id, sender_id, message_text) VALUES (?, ?, ?, ?)',
        [messageId, conversation_id, sender_id, message_text]
      );

      res.status(201).json({ 
        id: messageId,
        conversation_id,
        sender_id,
        message_text,
        created_at: new Date()
      });
    } catch (error) {
      res.status(500).json({ message: 'Error creating message', error: error.message });
    }
  },

  async getConversationMessages(req, res) {
    try {
      const { conversation_id } = req.params;
      
      const [messages] = await pool.query(
        `SELECT m.*, u.full_name as sender_name 
         FROM messages m 
         JOIN users u ON m.sender_id = u.user_id 
         WHERE m.conversation_id = ? 
         ORDER BY m.created_at ASC`,
        [conversation_id]
      );

      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching messages', error: error.message });
    }
  }
};

module.exports = messageController;