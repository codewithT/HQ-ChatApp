const io = require('socket.io')(3000);
const mongoose = require('mongoose');
const Content = require('./models/content'); // Import Content model
const User = require('./models/user'); // Import User model
const openai =  require('openai');
require('dotenv').config();

const apiKey = process.env.OPEN_AI_KEY;

// Initialize OpenAI API with your API key
const api = new openai(apiKey);
// MongoDB connection
async function connectToDB() {
  try {
    await mongoose.connect('//your mongodb link', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

connectToDB();

const users = {};

io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = { name, socketId: socket.id };
    console.log(users);
    socket.broadcast.emit('user-connected', `${name}`);
  });

  socket.on('send-chat-message', (message) => {
    const senderId = socket.id;
    const senderUser = users[senderId];
    
    if (!senderUser || !senderUser.name) {
      console.error('Sender ID or user not found.');
      return;
    }
  
    console.log(senderId);
  
    let check = false;
    for (const key in users) {
      if (key !== senderId) {
        check = true;
        socket.to(key).emit('chat-message', { message, name: users[key].name });
      }
    }
  
    if (!check) {
      console.error('Invalid receiver ID or user not found.');
    }
  });
  socket.on('send-ai-message', async (message) => {
    try {
      const description = await api.complete({
        model: 'gpt-3.5-turbo',
        prompt: `help with this query ${message}`,
        max_tokens: 100,
      });
  
      const aimsg = description.data.choices[0].text;
      socket.emit('chat-message', { message: aimsg });
    } catch (error) {
      console.error('OpenAI API error:', error);
    }
  });
  

  socket.on('disconnect', () => {
    console.log(users);
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
