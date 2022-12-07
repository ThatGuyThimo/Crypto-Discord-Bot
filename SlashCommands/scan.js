const SlashCommand = require("../Structures/SlashCommand.js");

const {roundDown} = require("../Classes/functions.js")

const {getTokenBallance} = require("../Classes/web3.js")

const config = require("../Data/config.json");

module.exports = new SlashCommand({
    "name": "scan",
    "description": "scans the contract for malicious function's.",
    "options": [{
        "name": "contractaddress",
        "description": "enter a contractaddress",
        "type": 3,
        "required": true
    }],

    async run(message, args, client) {
        const contractAddress = args[0].value
        const walletReg = new RegExp('0x+[A-F,a-f,0-9]{40}')

        if (walletReg.test(contractAddress)) {
            const result = roundDown(await getTokenBallance(config.BUSDabi, "ether", walletAddress, config.BUSDcontract), 100, false)
            message.reply(`result : ${result}`);
        } else {
            message.reply(`Invalid contractAddress : ${contractAddress}`);
        }

    }

});