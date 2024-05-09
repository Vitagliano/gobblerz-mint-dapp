import React from "react";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {NftSlider} from "@/components/nft-slider";
import {sickosAbi, majinoorsAbi, swolAbi, kingshitAbi, toucansAbi} from "@/abi";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <header className="flex justify-between items-center w-full max-w-7xl p-8">
                <h1 className="text-4xl font-bold">NFT Showcase</h1>
            </header>
            <main className="w-full max-w-7xl gap-16 flex flex-col justify-center">
                <NftSlider abi={sickosAbi} address="0xf6c95c3a750cc7f6a8c96d9b08cc132a44c7bd72"/>
                <NftSlider abi={swolAbi} address="0x245B532ad64c7FBfeEC9aa42f37291b183cEA91b"/>
                <NftSlider abi={majinoorsAbi} address="0xB528F3171bcdd1F5eE578fa7a2aAEa75ce945094"/>
                <NftSlider abi={toucansAbi} address="0x810a45ecaa8077c8d1fdbfe03e0ca96015cb79e2"/>
            </main>
        </div>

    );
}
