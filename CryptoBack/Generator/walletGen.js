// // import { Web3 } from 'web3';

// // const web3 = new Web3('https://eth.llamarpc.com');

// // const account = web3.eth.accounts.create();
// // console.log('Account:', account);

// const {Web3} = require('web3');
// const RLP = require('rlp');
// const { keccak256 , toBuffer } = require('ethereumjs-util');

// const web3 = new Web3('https://eth.llamarpc.com'); // You don't need a provider for this task

// function generatePrivateKey() {
//     return web3.eth.accounts.create().privateKey;
// }

// async function calculateContractAddress(deployerAddress, nonce) {
//     const rlpEncoded = RLP.encode([deployerAddress, nonce]);
//     const rlpEncodedBuffer = toBuffer(rlpEncoded); // Convert to buffer
//     const contractAddressLong = keccak256(rlpEncodedBuffer).toString('hex');
//     const contractAddress = '0x' + contractAddressLong.slice(24); // The last 20 bytes of the hash
//     return contractAddress;
// }

// async function bruteForceCustomAddress(prefix, maxAttempts = 1000000) {
//   let attempt = 0;
//   while (attempt < maxAttempts) {
//     const privateKey = generatePrivateKey();
//     const account = web3.eth.accounts.privateKeyToAccount(privateKey);
//     // const deployerAddress = "0xb144444D54c3634E1D65e345723D9e92926971E5";
//     const deployerAddress = account.address;

//     const contractAddress = calculateContractAddress(deployerAddress, 0);
//     if ((await contractAddress).startsWith(prefix)) {
//       console.log(`Found matching address: ${deployerAddress} with nonce 0`);
//       console.log(`Private Key: ${privateKey}`);
//       console.log(`Contract Address: ${contractAddress}`);
//       return { deployerAddress, privateKey, nonce: 0 };
//     }

//     attempt++;
//     if (attempt % 1000 === 0) {
//       console.log(`Attempts: ${attempt}, Current deployer address: ${deployerAddress}`);
//     }
//   }
//   console.log('Reached max attempts without finding a match');
// }

// // Desired prefix (without '0x')
// const desiredPrefix = '0x69420';
// bruteForceCustomAddress(desiredPrefix);

const { Web3 } = require("web3");
const RLP = require("rlp");
const { keccak256, toBuffer } = require("ethereumjs-util");

const web3 = new Web3("https://eth.llamarpc.com"); // You don't need a provider for this task

function generatePrivateKey() {
  return web3.eth.accounts.create().privateKey;
}

async function calculateContractAddress(deployerAddress, nonce, prefix , suffix) {
  const rlpEncoded = RLP.encode([deployerAddress, nonce]);
  const rlpEncodedBuffer = toBuffer(rlpEncoded); // Convert to buffer
  const contractAddressLong = keccak256(rlpEncodedBuffer).toString("hex");
  const contractAddress = "0x" + contractAddressLong.slice(24); // The last 20 bytes of the hash
  if(contractAddress.startsWith(prefix) && contractAddress.endsWith(suffix)){
    return contractAddress;
  }
  else{
    return null
  }
}

async function bruteForceCustomAddress(prefix, suffix, maxAttempts = 10000000) {
  let attempt = 0;
  let foundWallets = 0;
  const walletsArr = [];
  if (attempt === 0) {
    console.log("Brute force started!");
  }
  while (attempt < maxAttempts) {
    const privateKey = generatePrivateKey();
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    // const deployerAddress = "0xb144444D54c3634E1D65e345723D9e92926971E5";
    const deployerAddress = account.address;

    const contractAddress = await calculateContractAddress(deployerAddress , 0 , prefix , suffix );
    if (contractAddress != null) {
      console.log(`contractAddress : ${contractAddress}`);
      // if (contractAddress.startsWith(prefix) && contractAddress.endsWith(suffix)) {
      foundWallets++;
      let payload = {
        walletNum: foundWallets,
        attemptNum: attempt,
        deployer: deployerAddress,
        pk: privateKey,
        contract: contractAddress,
      };
      walletsArr.push(payload);
      console.log("payload :", payload);
      console.log("attempt :", attempt);
      console.log("Wallets Array : ", walletsArr);
      //   return { deployerAddress, privateKey, contractAddress, nonce: 0 };
    }
    
    attempt++;
    if (attempt % 100000 === 0) {
      console.log(`Attempts: ${attempt}, Currently found : ${foundWallets} wallets`);
    }
  }
  console.log(`Reached max attempts , found ${foundWallets} wallets : ${walletsArr}`);
}

// Desired prefix (without '0x')
const desiredPrefix = "0x420";
const desiredSuffix = "420"
bruteForceCustomAddress(desiredPrefix , desiredSuffix);
