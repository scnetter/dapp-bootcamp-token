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

	describe('Deployment', () => {

		const name = 'Lima Coin';
		const symbol = 'LIMA';
		const decimals = 18;
		const totalSupply = tokens(1000000);
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
	})

});
