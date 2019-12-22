import Web3 from "web3";

export function getWeb3(): Promise<Web3> {
  // @ts-ignore
  const { ethereum, web3 } = window;

  const reload = () => window.location.reload(true);

  return new Promise(async (resolve, reject) => {
    if (ethereum) {
      ethereum.autoRefreshOnNetworkChange = false;
      ethereum.on("networkChanged", reload);
      ethereum.on("accountsChanged", reload);
      await ethereum.enable();
      resolve(new Web3(ethereum));
    }
    else if (web3) {
      // Acccounts always exposed
      resolve(new Web3(web3.currentProvider));
    }
    // Non-dapp browsers...
    else {
      reject(new Error(`Please install and enable MetaMask!`));
    }
  });
}
