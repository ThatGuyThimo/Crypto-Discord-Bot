const SlashCommand = require("../Structures/SlashCommand.js");

const {roundDown} = require("../Classes/functions.js")

const {getTokenBallance, getTokenSymbol} = require("../Classes/web3.js")

const config = require("../Data/config.json");

const Discord = require("discord.js");

module.exports = new SlashCommand({
    "name": "balance",
    "description": "Get's the balance of the provided wallet address.",
    "options": [{
        "name": "walletaddress",
        "description": "enter a walletaddress",
        "type": 3,
        "required": true
    },
    {
        "name": "contractaddress",
        "description": "enter a contractaddress",
        "type": 3,
        "required": true
    }],

    async run(message, args, client) {
        const walletAddress = args[0].value
        const contractAddress = args[1].value
        const walletReg = new RegExp('0x+[A-F,a-f,0-9]{40}')
        const embed = new Discord.MessageEmbed();

        if (walletReg.test(walletAddress) && walletReg.test(contractAddress)) {
            let symbol = "" 
            await getTokenSymbol(config.BUSDabi, contractAddress).then(result => {
                symbol = result
            }).catch(error =>{
                console.error(error)
            })

            await getTokenBallance(config.BUSDabi, "ether", walletAddress, contractAddress).then(result => {

                result = roundDown(result, 100, false)
                // message.reply(`result : ${result}`);
    
                embed.setTitle(`Balance`)
                    .setAuthor(
                        message.user.username,
                        message.user.avatarURL()
                    )
                    .setDescription(`Balance from contract ${contractAddress}`)
                    .setColor(`${config.colorscheme}`)
                    .setThumbnail(client.user.avatarURL({ dynamic: true }))
                    .setTimestamp(message.createdTimestamp)
                    .addFields(
                        {
                            name: `Balance: `,
                            value: `${result} ${symbol}`,
                            inline: true
                        },
                        {
                            name: `Made by`,
                            value: `[@Bongo_dev](https://twitter.com/)`,
                            inline: true
                        },
                        {
                            name: `Advertisment`,
                            value: `Your ad here`,
                            inline: true
                        },
                    );
    
                message.reply({ embeds: [embed] });

            }).catch(error => {
              message.reply(`Error : ${error}`);  
            })
            
        } else {
            message.reply(`Invalid walletAddress or contractAddress`);
        }

    }

});