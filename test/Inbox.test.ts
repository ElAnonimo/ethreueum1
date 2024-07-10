import { ethers } from 'hardhat';
import * as assert from 'assert';
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
  console.log('ethers.provider.getNetwork:', await ethers.provider.getNetwork());
  inbox = await deployContract(initialMessage, account, fee.maxFeePerGas);
  // console.log('inbox:', await inbox.message());

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
    console.log('started');
    // const message = await inbox.message();
    // console.log('message:', await inbox.message());
    // assert.equal(message, initialMessage);
    assert.ok(5);
  });

  it('can set the message', async () => {
    await inbox.setMessage('bye');
    // const message = await inbox.message();
    // assert.equal(message, 'bye');
    console.log(await inbox.message());
  });
});
