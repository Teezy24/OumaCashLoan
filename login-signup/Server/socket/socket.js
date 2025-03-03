const socketIo = require('socket.io');

const setupSocket = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  let onlineUsers = new Map();

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('userConnected', (user_id) => {
      onlineUsers.set(user_id, socket.id);
      io.emit('usersOnline', Array.from(onlineUsers.keys()));
    });

    socket.on('sendMessage', ({ conversationId, senderId, message }) => {
      const receiverSocketId = onlineUsers.get(message.receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', {
          conversationId,
          senderId,
          message
        });
      }
    });

    socket.on('disconnect', () => {
      const user_id = Array.from(onlineUsers.entries())
        .find(([_, socketId]) => socketId === socket.id)?.[0];
      
      if (user_id) {
        onlineUsers.delete(user_id);
        io.emit('usersOnline', Array.from(onlineUsers.keys()));
      }
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = setupSocket;