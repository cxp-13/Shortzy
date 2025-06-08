"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { BoltIcon, BookOpenIcon, BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import { useState } from "react";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
// import ShortzyABI from "../contracts/Shortzy.json";
import SHORTZY_ABI from "../contracts/Shortzy";


const contractAddress = "0x3d91e5AC2d499fF3Da3Cd2690705Cc7e163AF32D";
const tokens = [
  { symbol: "DOGE", address: "0xba2ae424d960c26247dd6c32edc70b295c744c43", price: 0.07 },  // $0.07
  { symbol: "SHIBA", address: "0x95ad61b0a150d79219dcf64e1e6cc01f0b64c4ce", price: 0.00003 }, // $0.00003
];

const Home = () => {
  const { address: connectedAddress } = useAccount();
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [usdcAmount, setUsdcAmount] = useState("100");
  const [txHash, setTxHash] = useState<string | null>(null);
  const { data: shortingUsersCount } = useReadContract({
    abi: SHORTZY_ABI,
    address: contractAddress,
    functionName: "getShortingUsersCount",
  });

  // 然后使用shortingUsersCount来显示做空用户数量
  const { writeContract, isPending, failureReason } = useWriteContract()


  const handleShort = () => {
    if (!usdcAmount || Number(usdcAmount) <= 0) {
      alert("请输入正确的做空 USDC 数量");
      return;
    }
    try {
      writeContract({
        abi: SHORTZY_ABI,
        address: contractAddress,
        functionName: 'short',
        args: [
          selectedToken.address,
          Number(usdcAmount),
          Number(13)
        ],
      })
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex items-center flex-col flex-grow pt-10 px-4 max-w-lg mx-auto">
      <h1 className="text-4xl font-bold text-center mb-4">🚀 Shortzy 做空平台</h1>
      <p className="text-center text-lg mb-6">
        目前已有{" "}
        <span className="font-bold text-red-500">{Number(shortingUsersCount)}</span> 人做空！
      </p>

      {/* Token 选择 */}
      <label className="block mb-2 font-semibold">选择做空代币</label>
      <select
        className="input input-bordered w-full mb-4"
        value={selectedToken.address}
        onChange={(e) => {
          const token = tokens.find((t) => t.address === e.target.value);
          if (token) setSelectedToken(token);
        }}
      >
        {tokens.map((token) => (
          <option key={token.address} value={token.address}>
            {token.symbol} - 当前价格：${token.price.toFixed(6)}
          </option>
        ))}
      </select>

      {/* USDC 输入 */}
      <label className="block mb-2 font-semibold">做空金额 (USDC)</label>
      <input
        type="number"
        min="0"
        step="0.01"
        className="input input-bordered w-full mb-6"
        value={usdcAmount}
        onChange={(e) => setUsdcAmount(e.target.value)}
        placeholder="输入做空的 USDC 数量"
      />

      <button
        onClick={handleShort}
        disabled={isPending}
        className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-semibold w-full"
      >
        {isPending ? "🚀 正在提交做空交易..." : "🚀 做空"}
      </button>

      {txHash && (
        <div className="mt-6 text-center">
          <p className="text-green-500 font-semibold">交易已提交！</p>
          <a
            className="underline text-blue-500 break-all"
            href={`https://explorer.monad.xyz/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            查看交易: {txHash}
          </a>
        </div>
      )}

      {connectedAddress && (
        <div className="mt-10 text-center">
          <p className="font-medium">Connected 地址:</p>
          <Address address={connectedAddress} />
        </div>
      )}

      {failureReason && (
        <p className="mt-4 text-red-600 font-semibold">
          交易出错: {failureReason.message}
        </p>
      )}
    </div>
  );
};


export default Home;
