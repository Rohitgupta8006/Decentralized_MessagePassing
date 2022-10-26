const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const { abi, evm } = require('./compile');

provider = new HDWalletProvider(
  'fluid asset dumb rude indicate clever addict profit relax guitar busy illegal', //mnemonic, 12 words
'https://goerli.infura.io/v3/eabac76840e6419ab7b4e7248cf7213b'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(abi)
    .deploy({ data: evm.bytecode.object, arguments: ['Hi there!'] })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to (Contract Address) ', result.options.address);
  //0x36f56750c9f7759a201cF22de36Eb17408C3aDa0 -Deployed Contract address
  provider.engine.stop();
};

deploy();
//https://remix.ethereum.org/#optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.17+commit.8df45f5f.js
//https://goerli.etherscan.io/address/0x36f56750c9f7759a201cF22de36Eb17408C3aDa0