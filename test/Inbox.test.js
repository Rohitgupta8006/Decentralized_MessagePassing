const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');//contrstuctor fun.

const web3 = new Web3(ganache.provider());

// the above 1 line mean, we are creating an instance of Web3 and tell the instance to attempt to connect to this local test network that we are hosting in our machine. 
// we will change the provider as per the network (test or mainnet).

const { abi, evm } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(abi)
    .deploy({
      data: evm.bytecode.object,
      arguments: ['Hi there!'],
    })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });
  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
  it('can change the message', async () => {
    await inbox.methods.setMessage('bye').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'bye');
  });
});
