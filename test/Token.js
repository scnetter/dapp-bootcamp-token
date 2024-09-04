const { ethers } = require('hardhat');
const { expect } = require('chai');

// Helper function to convert tokens to value x 10^ether_decimals (18)
const tokens = (n) => {
	return ethers.utils.parseUnits(n.toString(), 'ether');
}

describe('Token', () => {
	let token;

	beforeEach( async () => {
		// Test setup - deploy and fetch token
		const Token = await ethers.getContractFactory('Token');
		token = await Token.deploy("Lima Coin", "LIMA", 1000000);
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
	it('has correct decimals', async () => {
		// Check symbol is correct
		expect(await token.decimals()).to.equal('18');
	});
		it('has correct totalSupply', async () => {
	// Check symbol is correct
		
		expect(await token.totalSupply()).to.equal(tokens(1000000));
	});
});
