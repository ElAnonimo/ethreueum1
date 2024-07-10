import { Signer, ContractTransactionResponse } from 'ethers';
import { ethers } from 'hardhat';
import { Inbox } from '../typechain-types';
import { NonPayableOverrides } from '../typechain-types/common';

// https://stackoverflow.com/a/76044177/5524590, https://ethereum.stackexchange.com/a/154641
const deployContract = async (initialMessage: string, signer: Signer, maxFeePerGas: NonPayableOverrides['maxFeePerGas']) => {
  const Inbox = await ethers.getContractFactory('Inbox', signer);
  const inbox = await Inbox.deploy(initialMessage, { maxFeePerGas });
  return inbox;
};

export type InboxType = Inbox & { deploymentTransaction(): ContractTransactionResponse };

export default deployContract;
