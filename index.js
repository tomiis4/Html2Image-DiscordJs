const H2I = require('node-html-to-image')
const Discord = require("discord.js");
const Buffer = require('buffer').Buffer;
const { Client, MessageAttachment, MessageEmbed, Intents } = require("discord.js");
const { MessageActionRow, MessageSelectMenu } = require("discord.js");
const config = require("./config.json");
const { setTimeout } = require('timers/promises');
const { Interaction } = require('discord.js');
const prefix = config.prefix
const client = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on("ready", () => {
    console.log(`Bot User ${client.user.username} has been logged.`);
    client.user.setActivity('.help', { type: 'WATCHING' });
});

//! Preview Command
client.on("messageCreate", (message)  => {
    if (message.content.startsWith(`${prefix}run`)){
        const msgCdodeFirst = message.content.replace(/.run/g, '').trim() //? Get msg conent
        const msgCodeCSSF = msgCdodeFirst.split('```css').pop().trim()
        const msgCodeCSS = msgCodeCSSF.replace(/```/g, '').trim()  //! get CSS code
        const msgCodeCSSNumberS = msgCdodeFirst.indexOf("```css")
        const msgCodeCSSNumber = msgCodeCSSNumberS - 13

        const msgCodeHTMLF = msgCdodeFirst.replace(/```html/g, '').trim()
        const msgCodeHTML = msgCodeHTMLF.substring(0, msgCodeCSSNumber) //! get HTML code from CSS
        const msgCodeHTMLsecond = msgCodeHTMLF.replace(/```/g, '').trim() //! get HTML code
        const msgCodeSendHtmlCss =  `<style> body {width: 1366px; height: 768px;} ${msgCodeCSS} </style><body>${msgCodeHTML}</body>`
        const msgCodeSendHtml =  `<style> body {width: 1366px; height: 768px;} </style><body>${msgCodeHTMLsecond}</body>`

        const colorGenerator = Math.floor(Math.random()*16777215).toString(16);

            if (msgCdodeFirst.includes("```css") && msgCdodeFirst.includes("```html")) {
                const getImage = H2I({
                    html: `${msgCodeSendHtmlCss}`,
                    type: "png",
                    encoding: "base64"
                })
                .then(getImage => {
                    const Base64Img = Buffer.from(getImage, 'base64');
                    const Base64ImgAttach = new MessageAttachment(Base64Img, "Code.png");
                    const HtmlEmbed = new MessageEmbed()
                        .setTitle('**Here is your code!  :eyes:**')
                        .setImage('attachment://Code.png')
                        .setColor(`#${colorGenerator}`)
                        .setTimestamp()

                    message.reply({ embeds: [HtmlEmbed], files: [Base64ImgAttach] })
                })
        } else if (msgCdodeFirst.includes("```html")) {
            const getImage = H2I({
                html: `${msgCodeSendHtml}`,
                type: "png",
                encoding: "base64"
            })
            .then(getImage => {
                const Base64Img = Buffer.from(x, 'base64');
                const Base64ImgAttach = new MessageAttachment(Base64Img, "Code.html");
                const HtmlEmbed = new MessageEmbed()
                    .setTitle('**Here is your code!  :eyes:**')
                    .setImage('attachment://Code.png')
                    .setColor(`#${colorGenerator}`)
                    .setTimestamp()
                message.reply({ embeds: [HtmlEmbed], files: [Base64ImgAttach] })
            })
        } else {
            message.reply("Sorry, your message format is wrong.")
        }
    }
})



client.login(config.token);
