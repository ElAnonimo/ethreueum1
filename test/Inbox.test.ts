import hre, { ethers } from 'hardhat';
import * as assert from 'assert';
import { keccak256 } from 'hardhat/internal/util/keccak';
import deployContract, { InboxType } from '../scripts/deploy';

let inbox: InboxType;
const initialMessage = 'initial message';

beforeEach(async () => {
  const account = await ethers.provider.getSigner();
  console.log('account:', account);
  // 1000000 for `maxFeePerGas` gives ProviderError: Transaction maxFeePerGas (1000000) is too low for the next block, which has a baseFeePerGas of 875000000
  // https://ethereum.stackexchange.com/a/155197
  const fee = await ethers.provider.getFeeData();
  const balance = await ethers.provider.getBalance(account);
  console.log('balance:', balance);
  // on fee: gasPrice, maxFeePerGas, maxPriorityFeePerGas
  inbox = await deployContract(initialMessage, account, fee.maxFeePerGas);
  console.log('ethers.provider.getNetwork:', await ethers.provider.getNetwork());

  // const transactionHash = await owner.sendTransaction({
  //   // https://ethereum.stackexchange.com/a/102559
  //   value: ethers.parseEther('1.0')   // Sends exactly 1.0 ether
  // });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.target);
  });

  it('has an initial message', async () => {
    const message = await inbox.message();
    assert.equal(message, initialMessage);
  });

  it('can set the message', async () => {
    // same as await inbox.getAddress()
    console.log('Deployed contract address:', inbox.target);

    const tx1 = await inbox.setMessage('bye', { gasLimit: 100000 });
    await tx1.wait(1);    // Ensure waiting for the transaction to be mined

    const code = await ethers.provider.getCode(inbox.target);
    console.log('Contract bytecode:', code);
    // Ethers + React: https://medium.com/coinmonks/integrating-ether-js-with-react-a-comprehensive-guide-cd9ccba57b93
    // swap `new ethers.ContractFactory(...)` with `await ethers.getContractFactory('Inbox', signer)` cause:
    // you can skip ABI to get contract instance directly, found on https://ethereum.stackexchange.com/a/135587

    const message = await inbox.message();
    assert.equal(message, 'bye');
  });
});
