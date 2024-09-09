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
		let amount, transaction, result;

		describe('Success', () => {
			beforeEach( async () => {
				amount = tokens(100);
				transaction = await token.connect(deployer).transfer(receiverAddress, amount);
				result = await transaction.wait();
			});

			it('transfers tokens between accounts', async () => {
				expect(await token.balanceOf(deployerAddress)).to.equal(tokens(999900));
				expect(await token.balanceOf(receiverAddress)).to.equal(amount);
			});

			it('emits a Transfer event', async () => {

			    const event = result.events[0];
			    expect(event.event).to.equal('Transfer');

			    const argss = event.args;
			    expect(argss._from).to.equal(deployerAddress);
			    expect(argss._to).to.equal(receiverAddress);
			    expect(argss._value).to.equal(amount);
			});
		});

		describe('Failure', async () => {
			it('fails if sender does not have enough tokens', async () => {
				const invalidAmount = tokens(totalSupply + 1);
				await expect(token.connect(deployer).transfer(receiverAddress, invalidAmount)).to.be.reverted;
			});
			it('fails if the recipient does not exist', async () => {
				await expect(token.connect(deployer).transfer(ethers.constants.AddressZero, amount)).to.be.reverted;
			});
		});

	});
});
