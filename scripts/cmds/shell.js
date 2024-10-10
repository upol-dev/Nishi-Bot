module.exports.config = {
	name: "shell",
	version: "1.0",
	role: 2,
	author: "UPoL 🐔",
	description: {
    en: "running shell",
	Category: "System",

	}
};
module.exports.onStart = async function({ api, event, args, Threads, Users, Currencies, models }) {    
const { exec } = require("child_process");
const god = ["100068507486779", "100012198960574"];
  if (!god.includes(event.senderID)) 
return api.sendMessage("My Boss (UPoL🐔) can use this command. So don't try to use this cmd.", event.threadID, event.messageID);
const text = args.join(" ")
  if (!text) {
    return message.reply('Please enter a command to run.');
  }
exec(`${text}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`error: \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`stderr:\n ${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`stdout:\n ${stdout}`, event.threadID, event.messageID);
});
}
