const { ethers } = require("ethers");
const Web3 = require('web3');
const config = require("../Data/config.json")

/**
 *
 * @param {string} abi
 * @param {string} conversion name of the convertion eg ether, gwei etc
 * @param {string} address
 * @param {string} contractaddress
 * @returns ballance of enterd wallet adress in the requested crypto
 */
 function getTokenBallance(abi, conversion, address, contractaddress) {
    try {
        const data = require(`../Data/${abi}`)
        abi = data
      } catch (err) {
        console.error(err);
      }

      const web3 = new Web3( config.network );

      const contract = new web3.eth.Contract(abi, contractaddress)

      try {
          return new Promise(resolve => {
              contract.methods.balanceOf(address).call().then(function (result) {
          resolve(web3.utils.fromWei(result, conversion));
          });
         });
      } catch {
        console.log(`something went wrong with web3`)
        return "Something went wrong"
      }
}
// /**
//  *
//  * @param {string} abi
//  * @param {string} conversion name of the convertion eg ether, gwei etc
//  * @param {string} address
//  * @param {string} contractaddress
//  * @returns ballance of enterd wallet adress in the requested crypto
//  */
//  function getTokenBallance(abi, conversion, address, contractaddress) {
//     try {
//         const data = require(`../Data/${abi}`)
//         abi = data
//       } catch (err) {
//         console.error(err);
//       }

//       const provider = ethers.getDefaultProvider(ethers.providers.getNetwork(56))

//       const contract = new ethers.Contract(contractaddress, abi, provider)

//       try {
//           return new Promise(resolve => {
//               contract.balanceOf(address).then(function (result) {
//           resolve(ethers.utils.parseUnits(conversion, result));
//           });
//          });
//       } catch {
//         console.log(`something went wrong with web3`)
//         return "Something went wrong"
//       }
// }

module.exports = {getTokenBallance};