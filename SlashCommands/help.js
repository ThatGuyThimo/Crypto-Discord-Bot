const SlashCommand = require("../Structures/SlashCommand.js");

const Discord = require("discord.js");

const config = require("../Data/config.json");

module.exports = new SlashCommand({
    name: "help",
    description: "Shows info about commands",
    async run(message, args, client) {

        const embed = new Discord.MessageEmbed();

        embed.setTitle(`${client.user.username} help`)
            .setAuthor(
                message.user.username,
                message.user.avatarURL()
            )
            .setDescription(`Information and usage of ${client.user.username}`)
            .setColor(`${config.colorscheme}`)
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setTimestamp(message.createdTimestamp)
            .addFields(
                {
                    name: `/about`,
                    value: `gives info about ${client.user.username}`,
                    inline: false
                },
                {
                    name: `/help`,
                    value: `gives info about ${client.user.username} text commands`,
                    inline: false
                },
            );

        // message.channel.send({ embeds: [embed] });
        message.reply({ embeds: [embed] });

    }
});