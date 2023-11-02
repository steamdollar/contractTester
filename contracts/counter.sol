// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// import "hardhat/console.sol";
// 이 코드를 추가함으로써 컨트랙트에서 console.log 기능을 사용할 수 있다.

// contract Counter {
//     uint public count;
//     address payable public owner;

//     constructor(uint _initialNum) payable {
//         count = _initialNum;
//         owner = payable(msg.sender);
//     }

//     function decrease() public {
//         require(count >= 1, "cannot be negative number");
//         console.log("proceeding decrease");

//         count--;
//         console.log('current number :', count);
//     }

//     function increase() public {
//         console.log("proceeding increase");
//         count++;

//         console.log("current number :" , count);
//     }

//     function showNum() public view returns(uint) {
//         console.log("showing number...");
//         return count;
//     }
// }

contract Counter {
    uint public count;
    address payable public owner;

    constructor(uint _initialNum) payable {
        count = _initialNum;
        owner = payable(msg.sender);
    }
    function decrease() public {
        require(count >= 1, "cannot be negative number");
        count--;
    }
    function increase() public {
        count++; 
    }
    function showNum() public view returns(uint) {
        return count;
    }
}