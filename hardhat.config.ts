import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import 'dotenv/config';

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.24'
  },
  // https://docs.alchemy.com/docs/how-to-deploy-a-smart-contract-to-the-sepolia-testnet#updating-hardhatconfigjs-file
  defaultNetwork: 'sepolia',
  networks: {
    sepolia: {
      url: `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: [process.env.METAMASK_PRIVATE_KEY!]
    }
  },
  mocha: {
    timeout: 20 * 1000
  }
};

export default config;
