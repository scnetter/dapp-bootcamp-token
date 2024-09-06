const { ethers } = require('hardhat');
const { expect } = require('chai');

// Helper function to convert tokens to value x 10^ether_decimals (18)
const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether');
}

const totalSupply = tokens(1000000);

describe('Token', () => {
	let token, accounts, deployerAddress, deployer, receiver;

	beforeEach( async () => {
		// Test setup - deploy and fetch token
		const Token = await ethers.getContractFactory('Token');
		token = await Token.deploy("Lima Coin", "LIMA", 1000000);
		accounts = await ethers.getSigners();
		deployer = accounts[0];
		receiver = accounts[1];
		deployerAddress = deployer.address;
		receiverAddress = receiver.address;
	});

	describe('Deployment', () => {

		const name = 'Lima Coin';
		const symbol = 'LIMA';
		const decimals = 18;
		// Deployment Tests go here
		it('has correct name', async () => {
			// Check name is correct
			expect(await token.name()).to.equal(name);
		});

		it('has correct symbol', async () => {
			// Check symbol is correct
			expect(await token.symbol()).to.equal(symbol);
		});
		it('has correct decimals', async () => {
			// Check symbol is correct
			expect(await token.decimals()).to.equal(decimals);
		});
		it('has correct totalSupply', async () => {
		// Check symbol is correct
			
			expect(await token.totalSupply()).to.equal(totalSupply);
		});
		it('assigns total supply to deployer', async () => {
			expect(await token.totalSupply()).to.equal(await token.balanceOf(deployerAddress));
			
		});
	});

	describe('Transfers', () => {
		it('transfers tokens between accounts', async () => {
			// Creates a signed contract
			let transaction = await token.connect(deployer).transfer(receiverAddress, tokens(100));
			let result = transaction.wait();
			console.log(result);
			expect(await deployer.getBalance()).to.equal(totalSupply - tokens(100));
			expect(await token.balanceOf(receiverAddress)).to.equal(tokens(100)); 
		});
	});
});
