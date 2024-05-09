'use client'
// components/NftSlider.tsx
import React, {useState} from 'react';
import {useNFTIds, useNFTMetadata} from "@/hooks/useNFTs";

import {Card, CardContent} from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {useWatchContractEvent} from "wagmi";
import {NFTCard} from "@/components/nft-card";

export const NftSlider = ({address, abi}) => {
    const [updateTrigger, setUpdateTrigger] = useState(0);


    useWatchContractEvent({
        address: address,
        abi: abi,
        eventName: 'Transfer',

        onLogs(logs) {
            console.log('New transfer logs!', logs);
            setUpdateTrigger(prev => prev + 1);
        },
        poll: true,
        pollingInterval: 1500,
        syncConnectedChain: true
    });

    useWatchContractEvent({
        address: address,
        abi: abi,
        eventName: 'Safe Transfer From',

        onLogs(logs) {
            console.log('New safe transfer logs!', logs);
            setUpdateTrigger(prev => prev + 1)
        },
        poll: true,
        pollingInterval: 1500,
        syncConnectedChain: true
    });

    const {bigIntIds} = useNFTIds({address, abi, updateTrigger});
    const {tokens, isLoading} = useNFTMetadata({address, ids: bigIntIds, updateTrigger});


    return (
        <div key={updateTrigger} className="w-full flex justify-center flex-col">
            {!isLoading ?
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full">
                    <CarouselContent>
                        {tokens.map((token, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/6">
                                <NFTCard token={token}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel> : <p>Loading...</p>}

        </div>
    );
};