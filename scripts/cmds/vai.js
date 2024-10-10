const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: 'vai',
    version: '1.0',
    author: 'UPoL',
    role: 0,
    category: 'herc',
    guide: {
      en: '{pn} <question>'
    }
  },
  onStart: async function ({ api, event, message, args, usersData }) {
    const input = args.join(' ');
    if (!input) return message.reply('Please enter a question');
    const userName = await usersData.getName(event.senderID);
    await message.reply('Processing your request....⏳');
    try {
      const hercaiResponse = await axios.get(`https://upol-rest-apis.onrender.com/gpt?prompt=${encodeURIComponent(input)}`);
      const textResponse = hercaiResponse.data.answer;
      const languageCode = 'en'; 
      const googleVoiceUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=${languageCode}&client=tw-ob&q=${encodeURIComponent(textResponse)}`;
      const response = await axios({
        url: googleVoiceUrl,
        method: 'GET',
        responseType: 'stream',
      });
      const filePath = path.resolve(__dirname, 'voice.mp3');
      const writer = fs.createWriteStream(filePath);
      response.data.pipe(writer);
      writer.on('finish', async () => {
        await api.sendMessage({ body: `${textResponse}`, attachment: fs.createReadStream(filePath) }, event.threadID);
        fs.unlinkSync(filePath);
      });
      writer.on('error', (err) => {
        throw new Error('Error generating voice: ' + err.message);
      });
    } catch (error) {
      message.reply(`Error: ${error.message}`);
    }
  }
};
