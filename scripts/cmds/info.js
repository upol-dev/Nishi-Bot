module.exports = {
  config: {
    name: "info",
    version: "1.0",
    author: "UPoL",
    role: 0,
    shortDescription: "admin and bot information",
    longDescription: "",
    category: "info",
    guide: "{p}{n}info"
  },

  onStart: async function ({ message, args, event, threadsData, api, usersData }) {
    var link = ["https://i.ibb.co/hXcdRBK/image.jpg"];


    const botName = 'MeGu_AI BoT';
    const botAdmin1 = 'U P O L    S A H A';
    const botAdmin2 = 'T A J K E Y A';
    const fbLink1 = `facebook.com/chikaupol007`;
    const fbLink2 = `🚫 upol hide this fblink`;
    const prefix = '*';
    const address1 = 'NETROKONA, BANGLADESH';
    const address2 = 'TUNGIPARA, BANGLADESH';
    const owner1 = 'U P O L';
    const owner2 = 'T A J K E Y A     U P O L S    W I F E ';
    const status1 = 'MINGLE';
    const status2 = 'MINGLE';

    const currentDate = new Date();
    const options = { timeZone: "Asia/Dhaka", hour12: true, year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric" };
    const dateTimeString = currentDate.toLocaleString("en-US", options).replace(/(\r\n|\n|\r)/gm, "");

    let img = link[Math.floor(Math.random() * link.length)];

    let formattedMessage;

    switch (args[0]) {
      case '1':
        formattedMessage = `𝐀𝐃𝐌𝐈𝐍 𝐀𝐍𝐃 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍

      ↣ Bot Name: ${botName}

      ↣ Bot Admin: ${botAdmin1}

      ↣ Address: ${address1}

      CONTACT

      ↣ Facebook: ${fbLink1}

      OTHER NFORMATION__________

      ↣ Bot Prefix: ${prefix}

      ↣ Bot Owner: ${owner1}

      ↣ Status: ${status1}

       DATE & TIME

      ↣ Current Date & Time in Bangladesh: ${dateTimeString}`;
        break;
      case '2':
        formattedMessage = `𝐀𝐃𝐌𝐈𝐍 𝐀𝐍𝐃 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍

      ↣ Bot Name: ${botName}

      ↣ Bot Owner: ${botAdmin2}

      ↣ Address: ${address2}

      CONTACT

      ↣ Facebook: ${fbLink2}

      OTHER NFORMATION__________

      ↣ Bot Prefix: ${prefix}

      ↣ Bot Admin: ${botAdmin2}

      ↣ Status: ${status2}

       DATE & TIME

      ↣ Current Date & Time in Bangladesh: ${dateTimeString}`;
        break;
      default:
        break;
    }

    message.send({
      body: formattedMessage,
      attachment: await global.utils.getStreamFromURL(img)
    });
  }
}
