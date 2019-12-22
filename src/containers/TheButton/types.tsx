import Web3 from "web3";
import { Contract } from "web3-eth-contract";

export interface Api {
  web3: Web3;
  account: string; // primary eth account
  contract: Contract;
}

export type InfoProps = {
  cost: string; // cost (in wei) of pushing the button
  ethCost: string;
  waitTime: number; // number of blocks that must pass before the game is over
  age: number; // Current number of blocks since the last press
  lastParticipant: string; // ether address of the last user to press the button
  expired: boolean; // true if the game is over
  isYou: boolean; // true if account === lastParticipant
};
