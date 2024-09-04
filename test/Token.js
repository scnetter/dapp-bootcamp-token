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
		// Check name is correct
		expect(await token.name()).to.equal('Lima Coin');
	});

	it('has correct symbol', async () => {
		// Check symbol is correct
		expect(await token.symbol()).to.equal('LIMA');
	});
});
