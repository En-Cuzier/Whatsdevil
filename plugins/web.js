let WhatsAlexa = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let TinyURL = require('tinyurl');
let Config = require('../config');
let Language = require('../language');
let Lang = Language.getString('web');
let SLang = Language.getString('webss');

if (Config.WORKTYPE == 'private') {

    WhatsAlexa.addCommand({pattern: 'ping', fromMe: true, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
       var start = new Date().getTime();
       var msg = await message.client.sendMessage(message.jid, '```Ping!```', MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});
       var end = new Date().getTime();

       await msg.delete();
       await message.client.sendMessage(
         message.jid,'*Ping -* ```' + (end - start) + 'ms```\n\n', MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});
    }));

    WhatsAlexa.addCommand({pattern: 'short ?(.*)', fromMe: true, desc: Lang.URL}, (async (message, match) => {

         if (match[1] === '') return await message.client.sendMessage(message.jid, SLang.LİNK, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});

         TinyURL.shorten(`${match[1]}`, async(res, err) => {
           if (err)
             await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});

             await message.client.sendMessage(message.jid,`*Original Link:* ${match[1]}\n*Short Link:* ` + res, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});
         });
    }));
}
else if (Config.WORKTYPE == 'public') {
    
    WhatsAlexa.addCommand({pattern: 'ping', fromMe: true, deleteCommand: false, desc: Lang.PING_DESC}, (async (message, match) => {
       var start = new Date().getTime();
       var msg = await message.client.sendMessage(message.jid, '```Ping!```', MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});
       var end = new Date().getTime();

       await msg.delete();
       await message.client.sendMessage(
         message.jid,'*Ping -* ```' + (end - start) + 'ms```\n\n', MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});
    }));

    WhatsAlexa.addCommand({pattern: 'short ?(.*)', fromMe: false, desc: Lang.URL}, (async (message, match) => {

         if (match[1] === '') return await message.client.sendMessage(message.jid, SLang.LİNK, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});

         TinyURL.shorten(`${match[1]}`, async(res, err) => {
           if (err)
             await message.client.sendMessage(message.jid, '*#### Error! ####*\n\n' + '```' + err + '```', MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});

             await message.client.sendMessage(message.jid,`*Original Link:* ${match[1]}\n*Short Link:* ` + res, MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }, quoted: message.data});
         });
    }));
}
