"use client"

import {useState, useEffect} from 'react';
import {useReadContract, useReadContracts} from 'wagmi';
import {useTokens} from "@/hooks/useTokens";

interface UseNFTIdsProps {
    address: `0x${string}`;
    abi: any;
    updateTrigger?: number;
}

interface UseNFTMetadataProps {
    address: `0x${string}`;
    ids: bigint[];
    updateTrigger?: number;
}

export const useNFTIds = ({address, abi, updateTrigger}: UseNFTIdsProps) => {
    const [fetchIds, setFetchIds] = useState<number[]>([]);
    const [bigIntIds, setBigIntIds] = useState<bigint[]>([]);

    const {data: totalAvailableIds, isLoading: isLoadingTotal} = useReadContract({
        address,
        abi,
        functionName: 'totalAvailableIds',
    });

    useEffect(() => {
        if (totalAvailableIds) {
            const total = Number(totalAvailableIds);
            const idsToFetch = Array.from({length: Math.min(total, 10)}, (_, i) => total - i - 1);
            setFetchIds(idsToFetch);
        }
    }, [totalAvailableIds, updateTrigger]);

    const contractCalls = fetchIds.map(id => ({
        address,
        abi,
        functionName: 'availableIds',
        args: [id],
    }));

    const {data: availableIds, isLoading: isLoadingIds} = useReadContracts({
        contracts: contractCalls,
        query: {
            enabled: fetchIds.length > 0,
        }
    });


    useEffect(() => {
        if (availableIds && availableIds.length > 0) {
            const ids = availableIds.map(item => item.result);
            setBigIntIds(ids);
        }
    }, [availableIds, updateTrigger]);


    return {bigIntIds};
};

export const useNFTMetadata = ({address, ids, updateTrigger}: UseNFTMetadataProps) => {
    const [tokens, setTokens] = useState<any[]>([]);
    const {tokens: fetchedTokens, isLoading} = useTokens(address, ids, 'w3s');
    useEffect(() => {
        if (!isLoading && fetchedTokens) {
            setTokens(fetchedTokens);
        }
    }, [fetchedTokens, isLoading, updateTrigger]);

    return {tokens, isLoading};
};