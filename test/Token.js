const { ethers } = require('hardhat');
const { expect } = require('chai');

describe('Token', () => {
	// Tests go here
	it('has a name', async () => {
		
		// Fetch from blockchain
		const Token = await ethers.getContractFactory('Token');
		let token = await Token.deploy();
		// Read token name
		const name = await token.name()
		// Check name is correct
		expect(name).to.equal('LIMA Coin');
	});
});
