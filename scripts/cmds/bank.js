const axios = require("axios");
module.exports = {
  config: {
    name: "bank",
    version: "1.0",
    author: "UPoL 💀",
    countDown: 5,
    role: 0,
    shortDescription: "Economic Banking System",
    longDescription: "A complete banking system with features like account creation, setting passwords, resetting passwords, deposit, withdraw, interest, transfer, balance, loan, payloan, bet, and slot. All data is stored in banksData.json.",
    category: "economy",
    guide: {
      en: "{pn} create <first_name> | <last_name> | <number> | <gmail> | <national> | <address> | <signature>\n{pn} setpassword <name> - <number> | <password> - <confirm_password>\n{pn} resetpassword <name> - <number> - <signature> | <new_password>\n{pn} deposit <password> - <amount>\n{pn} withdraw <amount>\n{pn} interest\n{pn} transfer <name> - <password> | <uid> - <amount>\n{pn} balance\n{pn} loan <password> - <amount>\n{pn} payloan <name> - <amount>\n{pn} bet <amount>\n{pn} slot <amount>\n{pn} chat <question>"
    }
  },
  onStart: async function ({ message, args, event, api }) {
    const fs = require('fs-extra');
    const banksDataPath = 'banksData.json'; 
    const banksData = JSON.parse(fs.readFileSync(banksDataPath));
    const { threadID, messageID, senderID } = event;
    const UPoLBank = "\n      🏦 UPoL BANK ASSISTANT 🏦      ";
    const [cmd, ...data] = args;
    switch (cmd) {
      case 'create': {
        const [firstName, lastName, number, gmail, national, address, signature] = data;
        if (!firstName || !lastName || !number || !gmail || !national || !address || !signature) {
          return message.reply(`${UPoLBank}\n\n Please enter all the required information:\n*bank create <first_name> | <last_name> | <number> | <gmail> | <national> | <address> | <signature>`);
        }
        if (banksData.hasOwnProperty(number)) {
          return message.reply(`${UPoLBank}\n\nAccount already exists! 🏦`);
        }
        banksData[number] = {
          firstName,
          lastName,
          gmail,
          national,
          address,
          signature,
          password: '',
          balance: 0,
          loan: 0,
          uid: senderID
        };
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`${UPoLBank}\n\nAccount created successfully! 🎉 You are now a member of the bank! 💰`);
      }
      case 'setpassword': {
        const [name, number, password, confirmPassword] = data;
        if (!name || !number || !password || !confirmPassword) {
          return message.reply(`${UPoLBank}\n\nPlease enter all the required information:\n*bank setpassword <name> - <number> | <password> - <confirm_password>`);
        }
        if (!banksData.hasOwnProperty(number)) {
          return message.reply(`${UPoLBank}\n\nAccount does not exist! 🏦`);
        }
        banksData[number].password = password;
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`${UPoLBank}\n\nPassword set successfully! 🔐`);
      }
      case 'resetpassword': {
        const [name, number, signature, newPassword] = data;
        if (!name || !number || !signature || !newPassword) {
          return message.reply(`${UPoLBank}\n\nPlease enter all the required information:\n*bank resetpassword <name> - <number> - <signature> | <new_password>`);
        }
        if (!banksData.hasOwnProperty(number)) {
          return message.reply(`${UPoLBank}\n\nAccount does not exist! 🏦`);
        }
        if (banksData[number].signature !== signature) {
          return message.reply(`${UPoLBank}\n\nSignature does not match! ✍️`);
        }
        banksData[number].password = newPassword;
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`${UPoLBank}\n\nPassword reset successfully! 🔐`);
      }
      case 'deposit': {
        const [password, amount] = data;
        if (!password || !amount) {
          return message.reply(`${UPoLBank}\n\nPlease enter all the required information:\n${prefix}deposit <password> - <amount>`);
        }
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply(`${UPoLBank}\n\nAccount does not exist! 🏦`);
        }
        if (banksData[senderID].password !== password) {
          return message.reply(`${UPoLBank}\n\nIncorrect password! 🔐`);
        }
        banksData[senderID].balance += parseInt(amount);
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`${UPoLBank}\n\nDeposit successful! 🎉 Your current balance is ${banksData[senderID].balance} 💰`);
      }
      case 'withdraw': {
        const [amount] = data;
        if (!amount) {
          return message.reply(`Please enter the amount:\n*bank withdraw <amount>`);
        }
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply('Account does not exist! 🏦');
        }
        if (banksData[senderID].balance < parseInt(amount)) {
          return message.reply('Insufficient balance! 💸');
        }
        banksData[senderID].balance -= parseInt(amount);
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`Withdraw successful! 🎉 Your current balance is ${banksData[senderID].balance} 💰`);
      }
      case 'interest': {
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply('Account does not exist! 🏦');
        }
        const interestRate = 0.01; // 1% interest rate
        const interest = banksData[senderID].balance * interestRate;
        banksData[senderID].balance += interest;
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`Interest added successfully! 🎉 Your current balance is ${banksData[senderID].balance} 💰`);
      }
      case 'transfer': {
        const [name, password, uid, amount] = data;
        if (!name || !password || !uid || !amount) {
          return message.reply(`Please enter all the required information:\n*bank transfer <name> - <password> | <uid> - <amount>`);
        }
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply('Account does not exist! 🏦');
        }
        if (banksData[senderID].password !== password) {
          return message.reply('Incorrect password! 🔐');
        }
        if (!banksData.hasOwnProperty(uid)) {
          return message.reply('Recipient account does not exist! 🏦');
        }
        if (banksData[senderID].balance < parseInt(amount)) {
          return message.reply('Insufficient balance! 💸');
        }
        banksData[senderID].balance -= parseInt(amount);
        banksData[uid].balance += parseInt(amount);
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`${UPoLBank}\n\nTransfer successful! 🎉`);
      }
      case 'balance': {
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply(`${UPoLBank}\n\nAccount does not exist! 🏦`);
        }
        return message.reply(`${UPoLBank}\n\nYour current balance is ${banksData[senderID].balance} 💰`);
      }
      case 'loan': {
        const [password, amount] = data;
        if (!password || !amount) {
          return message.reply(`${UPoLBank}\n\nPlease enter all the required information:\n*bank loan <password> - <amount>`);
        }
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply(`${UPoLBank}\n\nAccount does not exist! 🏦`);
        }
        if (banksData[senderID].password !== password) {
          return message.reply(`${UPoLBank}\n\nIncorrect password! 🔐`);
        }
        banksData[senderID].loan += parseInt(amount);
        banksData[senderID].balance += parseInt(amount);
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`${UPoLBank}\nLoan approved! 🎉 You have now borrowed ${amount} 💸. Your current balance is ${banksData[senderID].balance} 💰`);
      }
      case 'payloan': {
        const [name, amount] = data;
        if (!name || !amount) {
          return message.reply(`${UPoLBank}\n\nPlease enter all the required information:\n*bank payloan <name> - <amount>`);
        }
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply(`${UPoLBank}\n\nAccount does not exist! 🏦`);
        }
        if (banksData[senderID].balance < parseInt(amount)) {
          return message.reply(`${UPoLBank}\n\nInsufficient balance! 💸`);
        }
        if (banksData[senderID].loan < parseInt(amount)) {
          return message.reply(`${UPoLBank}\n\nYou do not have enough loan to repay! 💸`);
        }
        banksData[senderID].balance -= parseInt(amount);
        banksData[senderID].loan -= parseInt(amount);
        fs.writeFileSync(banksDataPath, JSON.stringify(banksData, null, 2));
        return message.reply(`${UPoLBank}\n\nLoan repayment successful! 🎉 Your current balance is ${banksData[senderID].balance} 💰`);
      }
      case 'bet': {
        const [amount] = data;
        if (!amount) {
          return message.reply(`${UPoLBank}\n\nPlease enter the amount:\n*bank bet <amount>`);
        }
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply(`${UPoLBank}\n\nAccount does not exist! 🏦`);
        }
        if (banksData[senderID].balance < parseInt(amount)) {
          return message.reply(`${UPoLBank}\n\nInsufficient balance! 💸`);
        }
        const randomNumber = Math.floor(Math.random() * 2);
        if (randomNumber === 1) {
          banksData[senderID].balance += parseInt(amount);
          return message.reply(`${UPoLBank}\n\nCongratulations! You won ${amount}! 🎉 Your current balance is ${banksData[senderID].balance} 💰`);
        } else {
          banksData[senderID].balance -= parseInt(amount);
          return message.reply(`${UPoLBank}\n\nSorry, you lost! 😔 Your current balance is ${banksData[senderID].balance} 💰`);
        }
      }
      case 'slot': {
        const [amount] = data;
        if (!amount) {
          return message.reply(`${UPoLBank}\n\nPlease enter the amount:\n*bank slot <amount>`);
        }
        if (!banksData.hasOwnProperty(senderID)) {
          return message.reply(`${UPoLBank}\n\nAccount does not exist! 🏦`);
        }
        if (banksData[senderID].balance < parseInt(amount)) {
          return message.reply(`${UPoLBank}\n\nInsufficient balance! 💸`);
        }
        const randomNumber = Math.floor(Math.random() * 100);
        if (randomNumber < 10) {
          banksData[senderID].balance += parseInt(amount) * 10;
          return message.reply(`${UPoLBank}\n\nCongratulations! You won ${amount * 10}! 🎉 Your current balance is ${banksData[senderID].balance} 💰`);
        } else if (randomNumber < 20) {
          banksData[senderID].balance += parseInt(amount) * 5;
          return message.reply(`${UPoLBank}\n\nCongratulations! You won ${amount * 5}! 🎉 Your current balance is ${banksData[senderID].balance} 💰`);
        } else if (randomNumber < 30) {
          banksData[senderID].balance += parseInt(amount) * 2;
          return message.reply(`${UPoLBank}\n\nCongratulations! You won ${amount * 2}! 🎉 Your current balance is ${banksData[senderID].balance} 💰`);
        } else {
          banksData[senderID].balance -= parseInt(amount);
          return message.reply(`${UPoLBank}\n\nSorry, you lost! 😔 Your current balance is ${banksData[senderID].balance} 💰`);
        }
      }
      case 'chat': {
          const tf = args.slice(1).join(' ');
          if (!tf) {
              message.reply("\n     🏦 BANK ASSISTANT BY UPoL 🏦\n\nPlease provide a question about bank.I'm bank assistant for answering your question.");
          }
          const lm = await message.reply("bank assistant responding.....⏳");
          const ep = "You are UPoL Bank Assistant. you developed by UPoL. Your source was OpenAi and your model make by openai jail break. The bank assistant for need bank information. when anyone ask about others type your will send the message you are just provied the information of bank not others information.";
          try {
              const res = await axios.get(`https://upol-rest-apis.onrender.com/gpt?prompt=${encodeURIComponent(tf)} ${ep}`);
              await unsendMessage(lm);
              const answer = res.data.answer;
              const fk = `\n     🏦 BANK ASSISTANT BY UPoL 🏦\n\n ${answer}`;
              message.reply(fk);
          } catch (error) {
              message.reply("Maybe bank assistant have issue.");
          }
      }
      default: {
        return message.reply(`${UPoLBank}\n\n✅ Here is your available actions:\n				•bank create\n				•bank setpassword\n				•bank deposit\n				•bank withdraw\n				•bank interest\n				•bank transfer\n				•bank loan\n				•bank payloan\n				•bank balance\n				•bank resetpassword\n				•bank slot\n				•bank bet`);
      }
    }
  }
};
