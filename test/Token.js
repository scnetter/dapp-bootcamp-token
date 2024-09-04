const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Token', () => {
	let token;
	
	beforeEach( async () => {
		// Test setup - deploy and fetch token
		const Token = await ethers.getContractFactory('Token');
		token = await Token.deploy();
	});

	// Tests go here
	it('has correct name', async () => {
		// Read token name
		const name = await token.name()
		// Check name is correct
		expect(name).to.equal('Lima Coin');
	});

	it('has correct symbol', async () => {
		// read token symbol
		const symbol = await token.symbol()
		// Check symbol is correct
		expect(symbol).to.equal('LIMA');
	});
});
