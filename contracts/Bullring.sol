//SPDX-License-Identifier: MIT

pragma solidity 0.8.17;


/**
 * @dev Bullring Contract - Dapp investing platform.
 */
contract Bullring{
    
    struct Plan{
        uint dayslong;
        uint profit;
        uint max;
    }

    struct Deposit{
        uint amount;
        uint per_hour;
        uint finish;
        uint accured;
        uint plan_id;
        uint started;
        uint ended;
    }

    struct User{
        uint[3] referrals;
        uint[3] bonus;
        uint totalBonuses;
        uint deposits;
        uint last_deposit;
        uint invested;
        uint withdrawal;
        uint balance;
        uint totalAccured;
    }
    uint constant MIN_DEPOSIT = 0.01 ether;

    Plan[4] private _plan;
    address private immutable _owner;
    mapping(address=>User) private _users;
    mapping(address=>Deposit[]) private _deposits;
    mapping(address=>address) private _referrers;
    mapping (uint=>uint8[3]) private _payment_plan;

    event newDeposit(address owner, uint plan_id, uint amount);
    event refPayment(address ref, uint amount, uint level, uint ts);
    event Withdrawal(address owner, uint amount);

    constructor(address owner){
        _owner=owner;
        _plan[0]=Plan(40 days,500,40 ether);
        _plan[1]=Plan(30 days,570,15 ether);
        _plan[2]=Plan(20 days,725, 5 ether);
        _plan[3]=Plan(10 days,1200,2 ether);
        _payment_plan[0]=[15,2,1];
        _payment_plan[1]=[10,2,0];
        _payment_plan[2]=[6,1,0];
        _payment_plan[3]=[4,0,0];
    }
    /**
     * @dev Open new deposit from `plan_id`: sends `value` wei to
     * contract. If `referrer` set, provide payments by payment plan.
     *
     * Emits a {newDeposit} event.
     * Emits a {refPayment} event.

    */
    function deposit(uint plan_id, address referrer) external payable{
        require(msg.value >= MIN_DEPOSIT, "Minimal deposit is 0.01 BNB");
        require(msg.value <= _plan[plan_id].max, "Maximum deposit is limited");
        Deposit memory d;
        d.amount=msg.value;
        d.plan_id=plan_id;
        d.started=block.timestamp;
        d.ended=block.timestamp + _plan[plan_id].dayslong;
        d.finish = (msg.value * _plan[plan_id].profit / 10000 ) * _plan[plan_id].dayslong;
        d.per_hour =d.finish / (_plan[plan_id].dayslong * 24);
        if (_referrers[msg.sender]!=address(0)){
            referrer=_referrers[msg.sender];
        }else{
            _referrers[msg.sender]=referrer;
        }
        referrerPayment(msg.sender, _payment_plan[plan_id]);
        _deposits[msg.sender].push(d);
        _users[msg.sender].last_deposit=block.timestamp;
        _users[msg.sender].invested+=msg.value;
        _users[msg.sender].deposits++;
        sendValue(payable(_owner),msg.value / 100);
        emit newDeposit(msg.sender, plan_id, msg.value);
    }

    /**
     * @dev Provide information about `user` deposits at timestamp `ts`.
    */
    function getDepositsInfo(address user,uint ts) public view returns(Deposit[] memory deposits){
        deposits=_deposits[user];
        for(uint i=0;i<deposits.length;i++){
            uint _ts = ts < deposits[i].ended? ts : deposits[i].ended;
            uint past_hours = (_ts - deposits[i].started) / 3600;
            deposits[i].accured=deposits[i].per_hour * past_hours;
        }
    }

    /**
     * @dev Provide information about `user` at timestamp `ts`.
    */
    function getUserInfo(address user,uint ts) public view returns(User memory userinfo){
        userinfo=_users[user];
        Deposit[] memory deposits=_deposits[user];

        for(uint i=0;i<deposits.length;i++){
            uint _ts = ts < deposits[i].ended? ts : deposits[i].ended;
            uint past_hours = (_ts - deposits[i].started) / 3600;
            deposits[i].accured=deposits[i].per_hour * past_hours;
            userinfo.totalAccured+=deposits[i].accured;
        }
        userinfo.balance=userinfo.totalAccured + userinfo.totalBonuses - userinfo.withdrawal;
    }

    /**
     * @dev Withdraw `amount` from current balance.
    */
    function withdraw(uint amount) external {
        User memory userinfo;
        userinfo =getUserInfo(msg.sender, block.timestamp);
        require(amount <= userinfo.balance, "Not enough balance for withdraw");
        _users[msg.sender].withdrawal+=amount;
        sendValue(payable(msg.sender), amount);
        emit Withdrawal(msg.sender, amount);
    }


    function referrerPayment(address referral, uint8[3] storage payment_plan ) internal{
        address ref=_referrers[referral];
        for(uint i=0;i<2;i++){
            if (ref==address(0) || payment_plan[i]==0) break;
            uint amount = msg.value * payment_plan[i] / 100;
            _users[ref].totalBonuses+=amount;
            _users[ref].referrals[i]++;
            _users[ref].bonus[i]+=amount;
            emit refPayment(ref, amount, i + 1, block.timestamp);
            ref=_referrers[ref];
        }
    }


    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "Unable to send value, recipient may have reverted");
    }
}


