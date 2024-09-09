//SPDX-License-Identifier: Unlicensed
pragma solidity ^0.8.4;

// Allows us to do console logging on the contracts under dev
import "hardhat/console.sol";

contract Token {
	string public name;
	string public symbol;
	uint256 public decimals = 18;
	uint256 public totalSupply;

	// Track balances
	mapping(address => uint256) public balanceOf;

	event Transfer(
		address indexed _from, 
		address indexed _to, 
		uint256 _value
	);

	constructor(string memory _name,
				string memory _symbol,
				uint256 _totalSupply) 
	{
		name = _name;
		symbol = _symbol;
		totalSupply = _totalSupply * (10**decimals);
		balanceOf[msg.sender] = totalSupply;
	}

	function transfer(address _to, uint256 _value) 
		public 
		returns (bool success)
	{
		require(balanceOf[msg.sender] >= _value, "ERC20: transfer amount exceeds balance");
		require(_to != address(0), "ERC20: transfer to the zero address");
		
		balanceOf[_to] += _value;
		balanceOf[msg.sender] -= _value;
		
		emit Transfer(msg.sender, _to, _value);
		return true;
	}	
}
