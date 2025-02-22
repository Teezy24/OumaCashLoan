const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');
const auth = require('../middleware/auth');

router.post('/', auth, conversationController.createConversation);
router.get('/', auth, conversationController.getUserConversations);

module.exports = router;