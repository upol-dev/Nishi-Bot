module.exports = {
  config: {
    name: 'pfp',
    author: 'UPoL',
    role: 0,
    longDescription: 'display users profile picture',
    guide: {
      en: '{pn}'
    }
  },
    onStart: async function ({ event, message, usersData, args, getLang }) {
      let avt;
      const uid1 = event.senderID;
      const uid2 = Object.keys(event.mentions)[0];
      if(event.type == "message_reply"){
        avt = await usersData.getAvatarUrl(event.messageReply.senderID)
       } else {
        if (!uid2) { 
          avt =  await usersData.getAvatarUrl(uid1)
       } else { 
          avt = await usersData.getAvatarUrl(uid2)}}
      message.reply({
        body:"pfp 🖼️",
        attachment: await global.utils.getStreamFromURL(avt)
    })
    }
};
