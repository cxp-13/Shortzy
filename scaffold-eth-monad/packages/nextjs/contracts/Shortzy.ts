const SHORTZY_ABI = [
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "user", type: "address" },
            { indexed: true, internalType: "address", name: "token", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
            { indexed: false, internalType: "int256", name: "pnl", type: "int256" },
            { indexed: false, internalType: "uint256", name: "endTime", type: "uint256" }
        ],
        name: "MemeShortClosed",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "address", name: "user", type: "address" },
            { indexed: true, internalType: "address", name: "token", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "timestamp", type: "uint256" }
        ],
        name: "MemeShorted",
        type: "event",
    },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "int256", name: "pnl", type: "int256" }
        ],
        name: "closeShort",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" }
        ],
        name: "getTokenTotalShorted",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "user", type: "address" }
        ],
        name: "getUserShorts",
        outputs: [{
            components: [
                { internalType: "address", name: "token", type: "address" },
                { internalType: "uint256", name: "amount", type: "uint256" },
                { internalType: "uint256", name: "startTime", type: "uint256" },
                { internalType: "uint256", name: "endTime", type: "uint256" },
                { internalType: "int256", name: "pnl", type: "int256" }
            ],
            internalType: "struct Shortzy.ShortRecord[]",
            name: "",
            type: "tuple[]",
        }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "user", type: "address" }
        ],
        name: "getUserTotalPnL",
        outputs: [{ internalType: "int256", name: "", type: "int256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "address", name: "", type: "address" }
        ],
        name: "isShorting",
        outputs: [{ internalType: "bool", name: "", type: "bool" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "usdcAmount", type: "uint256" }
        ],
        name: "short",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" }
        ],
        name: "totalShortedAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" }
        ],
        name: "totalUserPnL",
        outputs: [{ internalType: "int256", name: "", type: "int256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "address", name: "", type: "address" },
            { internalType: "uint256", name: "", type: "uint256" }
        ],
        name: "userShortHistory",
        outputs: [
            { internalType: "address", name: "token", type: "address" },
            { internalType: "uint256", name: "amount", type: "uint256" },
            { internalType: "uint256", name: "startTime", type: "uint256" },
            { internalType: "uint256", name: "endTime", type: "uint256" },
            { internalType: "int256", name: "pnl", type: "int256" }
        ],
        stateMutability: "view",
        type: "function",
    }
];

export default SHORTZY_ABI;