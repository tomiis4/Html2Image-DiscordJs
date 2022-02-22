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
                const Base64Img = Buffer.from(getImage, 'base64');
                const Base64ImgAttach = new MessageAttachment(Base64Img, "Code.png");
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

//! Help Command
client.on("messageCreate", message => {
    if (message.content.startsWith(`${prefix}help`)){
		const HelpMenu = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('help-menu')
					.setPlaceholder('Nothing selected.')
                    .addOptions([
                        {
                            label: "Post Html.",
                            value: "Html",
                        },
                        {
                            label: "Post Html & Css.",
                            value: "HtmlAndCss",
                        },
                        {
                            label: "Other commands.",
                            value: "commands",
                        },
                    ])
			);
            message.reply({ ephemeral: true, components: [HelpMenu] });
    }
})
const Html = new MessageEmbed()
    .setTitle("How I can send HTML?")
    .setTimestamp()
    .setImage("https://media.discordapp.net/attachments/944300801529118791/944306794090602516/unknown.png")
    .setColor("#F1C40F");
const HtmlAndCss = new MessageEmbed()
    .setTitle("How I can send HTML with CSS?")
    .setTimestamp()
    .setImage("https://media.discordapp.net/attachments/944300801529118791/944306794317119498/unknown.png")
    .setColor("#F1C40F");
const commands = new MessageEmbed()
    .setTitle("Comming soon! :eyes:")
    .setTimestamp()
    .setColor("#000");
client.on("interactionCreate", interaction =>{
    if(interaction.isSelectMenu) {
        const InteractionValue = interaction.values[0]

        if (InteractionValue === "Html"){
            interaction.reply({ embeds: [Html]})
        }
        if (InteractionValue === "HtmlAndCss"){
            interaction.reply({ embeds: [HtmlAndCss]})
        }
        if (InteractionValue === "commands"){
            interaction.reply({ embeds: [commands]})
        }
    }
})

//! Edited messages
client.on('messageUpdate', (oldMessage, newMessage, message) => {
    if (newMessage.content.startsWith(`${prefix}run`)){
        const msgCdodeFirst = newMessage.content.replace(/.run/g, '').trim() //? Get msg conent
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
                        .setTitle('**Here is your mew code!  :eyes:**')
                        .setImage('attachment://Code.png')
                        .setColor(`#${colorGenerator}`)
                        .setTimestamp()

                    newMessage.reply({ embeds: [HtmlEmbed], files: [Base64ImgAttach] })
                })
        } else if (msgCdodeFirst.includes("```html")) {
            const getImage = H2I({
                html: `${msgCodeSendHtml}`,
                type: "png",
                encoding: "base64"
            })
            .then(getImage => {
                const Base64Img = Buffer.from(getImage, 'base64');
                const Base64ImgAttach = new MessageAttachment(Base64Img, "Code.png");
                const HtmlEmbed = new MessageEmbed()
                    .setTitle('**Here is your new code!  :eyes:**')
                    .setImage('attachment://Code.png')
                    .setColor(`#${colorGenerator}`)
                    .setTimestamp()

                newMessage.reply({ embeds: [HtmlEmbed], files: [Base64ImgAttach] })
            })
        } else {
            newMessage.reply("Sorry, your message format is wrong.")
        }
    }
})


client.login(config.token);