// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Shortzy {
    struct ShortRecord {
        address token;       // 做空目标 meme token 地址
        uint256 amount;      // 做空时投入的 USDC 数量
        uint256 startTime;   // 做空发起时间
        uint256 endTime;     // 做空结束时间
        int256 pnl;          // 最终盈亏（profit & loss），单位为 USDC，允许负数
    }

    mapping(address => ShortRecord[]) public userShortHistory;
    mapping(address => mapping(address => bool)) public isShorting;
    mapping(address => uint256) public totalShortedAmount;
    mapping(address => int256) public totalUserPnL; // 用户总盈亏统计

    event MemeShorted(address indexed user, address indexed token, uint256 amount, uint256 timestamp);
    event MemeShortClosed(address indexed user, address indexed token, uint256 amount, int256 pnl, uint256 endTime);

    function short(address token, uint256 usdcAmount) external {
        require(token != address(0), "Invalid token");
        require(usdcAmount > 0, "Amount must be > 0");

        isShorting[msg.sender][token] = true;
        totalShortedAmount[token] += usdcAmount;

        userShortHistory[msg.sender].push(ShortRecord({
            token: token,
            amount: usdcAmount,
            startTime: block.timestamp,
            endTime: 0,
            pnl: 0 // 初始为空，结算时填
        }));

        emit MemeShorted(msg.sender, token, usdcAmount, block.timestamp);
    }

    /**
     * 模拟结算做空结果，pnl 为输入（前端计算或预言机提供）
     * @param token 做空的 meme 币地址
     * @param pnl 本次做空的盈亏，正数表示赚，负数表示亏（单位 USDC）
     */
    function closeShort(address token, int256 pnl) external {
        require(isShorting[msg.sender][token], "Not currently shorting");

        ShortRecord[] storage records = userShortHistory[msg.sender];
        for (uint256 i = records.length; i > 0; i--) {
            ShortRecord storage record = records[i - 1];
            if (record.token == token && record.endTime == 0) {
                record.endTime = block.timestamp;
                record.pnl = pnl;
                break;
            }
        }

        isShorting[msg.sender][token] = false;
        totalUserPnL[msg.sender] += pnl;

        emit MemeShortClosed(msg.sender, token, 0, pnl, block.timestamp);
    }

    function getUserShorts(address user) external view returns (ShortRecord[] memory) {
        return userShortHistory[user];
    }

    function getTokenTotalShorted(address token) external view returns (uint256) {
        return totalShortedAmount[token];
    }

    function getUserTotalPnL(address user) external view returns (int256) {
        return totalUserPnL[user];
    }
}
