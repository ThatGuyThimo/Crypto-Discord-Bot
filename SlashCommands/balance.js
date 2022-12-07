const SlashCommand = require("../Structures/SlashCommand.js");

const {roundDown} = require("../Classes/functions.js")

const {getTokenBallance} = require("../Classes/web3.js")

const config = require("../Data/config.json");

module.exports = new SlashCommand({
    "name": "balance",
    "description": "Get's the balance of the provided wallet address.",
    "options": [{
        "name": "walletaddress",
        "description": "enter a walletaddress",
        "type": 3,
        "required": true
    }],

    async run(message, args, client) {
        const walletAddress = args[0].value
        const walletReg = new RegExp('0x+[A-F,a-f,0-9]{40}')

        if (walletReg.test(walletAddress)) {
            const result = roundDown(await getTokenBallance(config.BUSDabi, "ether", walletAddress, config.BUSDcontract), 100, false)
            message.reply(`result : ${result}`);
        } else {
            message.reply(`Invalid walletAddress : ${walletAddress}`);
        }

    }

});