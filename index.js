const Discord = require('discord.js')

const client = new Discord.Client();

let token

if (process.env.BOT_TOKEN) {
    token = process.env.BOT_TOKEN
} else {
    const config = require('./config.json')
    token = config.token
}

const prefix = '$'

const ytdl = require('ytdl-core')

const links = require('./ambience.json').ambience

client.on('ready', () => {
    console.log("Good Vibez Only")
})

const playMusic = (currentVoice, link) => {
    var voiceChannel = client.channels.cache.get(currentVoice);
    voiceChannel.join().then(connection => {
        const dispatcher = connection.play(ytdl(link));
        dispatcher.on('finish', () => {voiceChannel.leave();});
    }).catch(err => console.log(err));
}

const stopMusic = (currentVoice) => {
    var voiceChannel = client.channels.cache.get(currentVoice);
    voiceChannel.leave();
}

const getNames = (links) => {
    let ret = []
    links.forEach((item) => {
        ret.push(item.name)
    })
    return ret
}

const getLink = (links, name) => {
    let ret
    links.forEach((item) => {
        if (item.name === name) {
            ret = item.link
        }
    })
    return ret
}

client.on('message', async msg => {
    const message = msg.content
    const currPrefix = message.charAt(0)
    const command = message.substring(1)
    var currentVoice = msg.member.voice.channelID || "580229710043283474";
    if (currPrefix !== prefix || msg.author.bot) {
        return;
    }
    if (command === 'stop') {
        stopMusic(currentVoice)
        return
    }
    if (command === 'help') {
        msg.reply('' + getNames(links))
    }
    let link = getLink(links, command)
    if (link) {
        playMusic(currentVoice, link)
    }
})

client.login(token)