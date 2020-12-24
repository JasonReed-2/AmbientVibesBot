const Discord = require('discord.js')

const client = new Discord.Client();

const token = process.env.BOT_TOKEN || 'Nzg3NDI0NTE3MTQ4MTE0OTU0.X9UwOg.qOYlK197zFU1hyGhqJ9QnwJpYBY'

const prefix = '$'

const ytdl = require('ytdl-core')

const christ = 'https://www.youtube.com/watch?v=Ru8DQ5f5A6U'
const rock = 'https://www.youtube.com/watch?v=-G2854Bu-LQ'

client.on('ready', () => {
    console.log("Ho ho ho")
})

const playMusic = (currentVoice) => {
    var voiceChannel = client.channels.cache.get(currentVoice);
    voiceChannel.join().then(connection => {
        const dispatcher = connection.play(ytdl(christ));
        dispatcher.on('finish', () => {voiceChannel.leave();});
    }).catch(err => console.log(err));
}

const rockOut = (currentVoice) => {
    var voiceChannel = client.channels.cache.get(currentVoice);
    voiceChannel.join().then(connection => {
        const dispatcher = connection.play(ytdl(rock));
        dispatcher.on('finish', () => {voiceChannel.leave();});
    }).catch(err => console.log(err));
}

const stopMusic = (currentVoice) => {
    var voiceChannel = client.channels.cache.get(currentVoice);
    voiceChannel.leave();
}

client.on('message', async msg => {
    const message = msg.content
    const currPrefix = message.charAt(0)
    const command = message.substring(1)
    var currentVoice = msg.member.voice.channelID || "580229710043283474";
    if (currPrefix !== prefix || msg.author.bot) {
        return;
    }
    if (command === 'start') {
        playMusic(currentVoice)
    }
    if (command === 'stop') {
        stopMusic(currentVoice)
    }
    if (command === 'rock') {
        rockOut(currentVoice)
    }
})

client.login(token)