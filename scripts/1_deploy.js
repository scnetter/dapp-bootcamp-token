async function main() {
	const Token = await ethers.getContractFactory("Token");

	const token = await Token.deploy('Lima Token', 'LIMA', '1000000');
	await token.deployed();

	// No need to call token.deployed() explicitly
	console.log(`Token deployed to: ${token.address}`);
}


main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});