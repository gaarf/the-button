import Web3 from 'web3';
import ButtonABI from './Button.json';

console.log('Hello');

async function init() {
  console.log('Got here');
  const account = (await web3.eth.getAccounts())[0];
  const button = new web3.eth.Contract(ButtonABI, ButtonAddress);
  const cost = await button.methods.COST().call();
  console.log('It costs ' + cost + ' wei to press the button');
  
  const expired = await button.methods.expired().call();
  console.log('Expiry status: ' + expired);
  
  if (expired) {
    console.log('Expired! Claiming treasure!');
    const claim = await button.methods.claim_treasure().send({from: account});
    console.log(claim);
  }
  
  const result = await button.methods.press_button().send({from: account, value: cost});
  console.log(result);
}

window.addEventListener('load', async () => {
  // Modern dapp browsers...
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
      web3.eth.sendTransaction({/* ... */});
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.sendTransaction({/* ... */});
  }
  // Non-dapp browsers...
  else {
    console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
    return;
  }
  init();
});
