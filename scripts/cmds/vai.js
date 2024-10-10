const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: 'vai',
    version: '1.0',
    author: 'UPoL 🐔',
    role: 0,
    category: 'voice ai',
    guide: {
      en: '{pn} <question>'
    }
  },
  
  onStart: async function ({ api, event, message, args, usersData }) {
    const input = args.join(' ');
    
    if (!input) {        
      return message.reply('Please enter a question.');
    }
    
    const userName = await usersData.getName(event.senderID);
    await message.reply('Processing your request... ⏳');
    
    try {
      const gptResponse = await axios.get(`https://upol-rest-apis.onrender.com/gpt?prompt=${encodeURIComponent(input)}`);
      
      if (gptResponse.data.status === 'success' && gptResponse.data.response) {
        const textResponse = gptResponse.data.response;
        const msg = `${userName}, ${textResponse}`;
        
        const voiceUrl = `https://tts-siam-apiproject.vercel.app/speech?text=${encodeURIComponent(textResponse)}`;
        
        const response = await axios({
          url: voiceUrl,
          method: 'GET',
          responseType: 'stream',
        });
        
        const filePath = path.resolve(__dirname, 'voice.mp3');
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);
        
        writer.on('finish', async () => {
          await api.sendMessage({
            body: msg,
            attachment: fs.createReadStream(filePath)
          }, event.threadID);
          fs.unlinkSync(filePath);
        });
        
        writer.on('error', (err) => {
          console.error('Error writing the audio file:', err);
          message.reply('There was an error processing the voice response. Please try again.');
        });
      } else {
        message.reply('Failed to get a response from the GPT service. Please try again later.');
      }
    } catch (error) {
      console.error('Error during processing:', error);
      message.reply(`An error occurred: ${error.message}`);
    }
  }
};
