"use client"
import {useEffect} from "react";
import {useState} from "react";
import {erc721Abi} from "viem";
import * as allChains from "viem/chains";
import {usePublicClient} from "wagmi";
import {sickosAbi} from "@/abi";

const replacement = {
    ipfs: "https://ipfs.io/ipfs/",
    nftstorage: "https://nftstorage.link/ipfs/",
    w3s: "https://w3s.link/ipfs/",
};

export const useTokens = (
    address: string,
    tokenIds: bigint[],
    replacementType: "ipfs" | "nftstorage" | "w3s" = "ipfs",
) => {
    const chain = allChains["avalanche"];
    const selectedChain = chain;
    const publicClient = usePublicClient({chainId: selectedChain?.id});

    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const [tokens, setTokens] = useState<any[]>([]);

    useEffect(() => {
        async function get() {

            setIsLoading(true);
            setIsError(false);

            try {
                const collectionName = await publicClient?.readContract({
                    address,
                    abi: sickosAbi,
                    functionName: "name",
                });

                const collectionSymbol = await publicClient?.readContract({
                    address,
                    abi: sickosAbi,
                    functionName: "symbol",
                });

                const arr = [];

                for (let i = 0; i < tokenIds.length; i++) {
                    const tokenURI = await publicClient?.readContract({
                        address,
                        abi: sickosAbi,
                        functionName: "tokenURI",
                        args: [tokenIds[i]],
                    });

                    const tokenURIFormatted = tokenURI?.replace("ipfs://", replacement[replacementType]);

                    const metadata = await fetch(tokenURIFormatted!);
                    const metadataJson = await metadata.json();
                    metadataJson.image = metadataJson.image.replace("ipfs://", replacement[replacementType]);

                    const token = {} as any;
                    token.address = address;
                    token.metadata = metadataJson;
                    token.id = tokenIds[i];
                    token.uri = tokenURIFormatted;
                    token.collectionName = collectionName;
                    token.collectionSymbol = collectionSymbol;
                    arr.push(token);
                }

                setTokens([...arr]);
            } catch (e) {
                console.log(e);
                setIsError(true);
            }

            setIsLoading(false);
        }

        get();
    }, [publicClient?.account, tokenIds]);

    return {tokens, isLoading, isError};
};