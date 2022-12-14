const fs = require('fs');

const voiceDiscord = require('@discordjs/voice');

let time = new Date().getHours();

/**
 * 
 * @param {String} json 
 * @param {String} key 
 * @returns {String}
 */
function randomArray(json, key) {

    let array = fs.readFileSync(`./Data/${json}`);
    let data = JSON.parse(array);

    var keylist = Object.keys(data[key]);
    var ran_key = keylist[Math.floor(Math.random() * keylist.length)];

    return (data[key][keylist[ran_key]]);
}
/**
 * 
 * @param {array} array 
 * @returns {String}
 */
function parsejson(array) {

    let data = JSON.parse(array);
    console.log(data);
}

/**
 * 
 * @param {Discord.Client} client  
 */
function intervalPing(client) {

    let nowtime = new Date().getHours();

    let todayDay = new Date().getDate();
    let todayMonth = new Date().getMonth();

    if (todayDay == 7 && todayMonth == 6 && nowtime != time) {
        client.channels.cache.get('897144218571653150').send("***HAPPY BIRTHDAY*** <@186113462584344577> <:tada:994438381314506822> <:confetti_ball:994439911228846120>");
        time = nowtime;
    } else if (nowtime != time) {
        client.channels.cache.get('897144218571653150').send(randomArray("pings.json", "pings"));
        time = nowtime;
    }
}

/**
 * 
 * @param {string} source 
 * @param {Discord.Client.message} message 
 */
function playAudio(source, message) {
    const channel = message.member.voice.channel;
    if (!channel) {
        message.reply('Join a voice channel to use this command');
    } else {

        const player = voiceDiscord.createAudioPlayer();
        const resource = voiceDiscord.createAudioResource(`./audio/${source}`);

        const connection = voiceDiscord.joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        });
        player.play(resource);
        connection.subscribe(player);

        player.on(voiceDiscord.AudioPlayerStatus.Idle, () => {
            connection.destroy();
        })
    }
}

/**
 * 
 * @param {number} x 
 * @returns number with commas
 */
 function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 
 * @param {number} value 
 * @param {int} rounding 100 for 2 decimals optional
 * @param {bool} commas bool optional
 * @returns rounded down number
 */
 function roundDown(value, rounding = 100, commas = false) {
    value = Math.floor(value * rounding) / rounding;
    if (commas == true) {
        value = numberWithCommas(value);
        return value
    }
    return value
}

module.exports = { randomArray, intervalPing, playAudio, parsejson, roundDown};