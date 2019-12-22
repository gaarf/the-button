import Web3 from "web3";

export function getWeb3(): Promise<Web3> {
  // @ts-ignore
  const { ethereum, location, web3 } = window;

  const reload = () => location.reload(true);

  return new Promise(async (resolve, reject) => {
    if (ethereum) {
      ethereum.autoRefreshOnNetworkChange = false;
      await ethereum.enable();
      ethereum.on("networkChanged", reload);
      ethereum.on("accountsChanged", reload);

      if (ethereum.chainId !== "0x4") {
        reject(new Error("Please select the Rinkeby Test Network!"));
        return;
      }
      resolve(new Web3(ethereum));
    } else if (web3) {
      // Acccounts always exposed
      resolve(new Web3(web3.currentProvider));
    }
    // Non-dapp browsers...
    else {
      reject(new Error(`Please install and enable MetaMask!`));
    }
  });
}
