const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const auth = require('../middleware/auth');

router.post('/', auth, messageController.createMessage);
router.get('/conversation/:conversation_id', auth, messageController.getConversationMessages);

module.exports = router;