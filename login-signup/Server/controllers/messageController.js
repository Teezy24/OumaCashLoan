const db = require('../config/database');

const messageController = {
  getConversations: (req, res) => {
    const userId = req.user.id; // Assuming you have authentication middleware
    const query = `
      SELECT c.*, u.username as title
      FROM conversations c
      JOIN users u ON (c.user1_id = u.id OR c.user2_id = u.id)
      WHERE (c.user1_id = ? OR c.user2_id = ?)
      AND u.id != ?
    `;
    
    db.query(query, [userId, userId, userId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },

  getMessages: (req, res) => {
    const { conversationId } = req.params;
    const query = `
      SELECT * FROM messages 
      WHERE conversation_id = ?
      ORDER BY created_at ASC
    `;
    
    db.query(query, [conversationId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },

  createMessage: (req, res) => {
    const { conversation_id, message_text } = req.body;
    const sender_id = req.user.id; // Assuming you have authentication middleware
    
    const query = `
      INSERT INTO messages (conversation_id, sender_id, message_text)
      VALUES (?, ?, ?)
    `;
    
    db.query(query, [conversation_id, sender_id, message_text], (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      // Return the created message
      const message = {
        id: result.insertId,
        conversation_id,
        sender_id,
        message_text,
        created_at: new Date()
      };
      
      res.status(201).json(message);
    });
  }
};

module.exports = messageController;