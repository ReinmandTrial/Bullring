const assert = require("assert")
const Web3 = require("web3");
const providerUrl="http://127.0.0.1:8545"
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl))
const path = require("path");
const fs = require("fs");
const solc = require("solc");

let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
});


const CONTRACT_PATH="../contracs/Bullring.sol"
let contracts={
  'Bullring':{}
}

async function addSeconds(seconds) {
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_increaseTime',
        params: [ seconds ],
    }, () => {});
    await web3.currentProvider.send({
        jsonrpc: '2.0',
        method: 'evm_mine',
        params: [ ],
    }, () => {})
}

const user_info=async(account)=>{
    const block=await web3.eth.getBlock('latest')
    const date=new Date(block.timestamp * 1000)
    const ui=await contracts['Bullring'].contract.methods.getUserInfo(accounts[1], block.timestamp).call()
console.log(ui)
    console.log(`
===============================================================
User ${account}
Blockchain timestamp: ${date}
===============================================================
    `)
  }

const account_zero="0x0000000000000000000000000000000000000000"

describe("Test box", () => {

  it("Compile contract", async () => {
    const source = fs.readFileSync("../contracts/Bullring.sol", "utf8");
    var input = { language: 'Solidity', sources: { contract_file: { content: source  } },  settings: { optimizer: { enabled: true, runs: 200}, outputSelection: { '*': { '*': ['*'] } } } };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));
    if (typeof(output.errors)!='undefined') console.log(output.errors);
    contracts['Bullring'].abi = output.contracts.contract_file['Bullring'].abi;
    contracts['Bullring'].bytecode = output.contracts.contract_file['Bullring'].evm.bytecode.object;
    assert.ok(!output.errors, output.errors);
  })

  it("Deploy 'Bullring'", async () => {
    const startDate=Math.round(Date.now() / 1000)
    contracts['Bullring'].contract = await new web3.eth.Contract(contracts['Bullring'].abi)
        .deploy({  data: contracts['Bullring'].bytecode,  arguments: [ accounts[0] ] })
        .send({ from: accounts[0], gasLimit: "80000000" });
    })

  it("User1 Withdraw BNB profit balace with error", async () => {
      const ts=Math.round(Date.now() / 1000 )
      const ui=await contracts['Bullring'].contract.methods.getUserInfo(accounts[1],0).call()
      const value=ui.totalAccrued
    try{
      await contracts['Bullring'].contract.methods.withdraw(value).send({from: accounts[1], gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Exception('Call without errors')
      }
  })

  it("User1 Invest 0.001 BNB (plan_id=0) with error", async () => {
      const value=web3.utils.toWei('0.001')
    try{
      await contracts['Bullring'].contract.methods.deposit(0, account_zero).send({from: accounts[1], value: value, gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Error('Call without errors')
      }
  })

  it("User1 Invest 0.001 BNB (plan_id=1) with error", async () => {
      const value=web3.utils.toWei('0.001')
    try{
      await contracts['Bullring'].contract.methods.deposit(1, account_zero).send({from: accounts[1], value: value, gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Error('Call without errors')
      }
  })

  it("User1 Invest 0.001 BNB (plan_id=2) with error", async () => {
      const value=web3.utils.toWei('0.001')
    try{
      await contracts['Bullring'].contract.methods.deposit(2, account_zero).send({from: accounts[1], value: value, gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Error('Call without errors')
      }
  })

  it("User1 Invest 0.001 BNB (plan_id=3) with error", async () => {
      const value=web3.utils.toWei('0.001')
    try{
      await contracts['Bullring'].contract.methods.deposit(3, account_zero).send({from: accounts[1], value: value, gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Error('Call without errors')
      }
  })

  it("User1 Invest 41 BNB (plan_id=0) with error", async () => {
      const value=web3.utils.toWei('41')
    try{
      await contracts['Bullring'].contract.methods.deposit(0, account_zero).send({from: accounts[1], value: value, gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Error('Call without errors')
      }
  })

  it("User1 Invest 41 BNB (plan_id=1) with error", async () => {
      const value=web3.utils.toWei('41')
    try{
      await contracts['Bullring'].contract.methods.deposit(1, account_zero).send({from: accounts[1], value: value, gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Error('Call without errors')
      }
  })

  it("User1 Invest 41 BNB (plan_id=2) with error", async () => {
      const value=web3.utils.toWei('41')
    try{
      await contracts['Bullring'].contract.methods.deposit(2, account_zero).send({from: accounts[1], value: value, gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Error('Call without errors')
      }
  })

  it("User1 Invest 41 BNB (plan_id=3) with error", async () => {
      const value=web3.utils.toWei('41')
    try{
      await contracts['Bullring'].contract.methods.deposit(3, account_zero).send({from: accounts[1], value: value, gas: 8000000})
      throw new Error('error')
    }catch(e){
        if (e.message=='error') throw new Error('Call without errors')
      }
  })

  it("User1 Invest 0.01 BNB (plan_id=0)", async () => {
      const value=web3.utils.toWei('0.01')
      await contracts['Bullring'].contract.methods.deposit(3, account_zero).send({from: accounts[1], value: value, gas: 8000000})
  })
  it("User1 Invest 0.1 BNB (plan_id=0)", async () => {
      const value=web3.utils.toWei('0.1')
      await contracts['Bullring'].contract.methods.deposit(3, account_zero).send({from: accounts[1], value: value, gas: 8000000})
  })


  it("Check User1 balances +40 days", async () => {
      await addSeconds( 3600 * 24 * 40)
      await user_info(accounts[1])
  })
  it("Check User1 balances +10 days", async () => {
      await addSeconds( 3600 * 24 * 10)
      await user_info(accounts[1])
  })

  it("Withdraw User1 profit balance +10", async () => {
      const block=await web3.eth.getBlock('latest')
      const ui=await contracts['Bullring'].contract.methods.getUserInfo(accounts[1], block.timestamp).call()
      const value=ui['balance']
      await contracts['Bullring'].contract.methods.withdraw(value).send({from: accounts[1], gas: 8000000})
  })

  })