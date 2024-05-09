import {Card} from "@/components/ui/card";
import Image from "next/image";
import {FC} from 'react';

interface Token {
    id: string;
    collectionName: string;
    collectionSymbol: string;
    metadata: {
        image: string;
        name: string;
    };
}

export const NFTCard: FC<{ token: Token }> = ({token}) => {

    const {metadata, id, collectionName, collectionSymbol} = token;
    return (
        <Card className="p-0 border-0 bg-transparent">
            <div className="relative h-auto aspect-square rounded-lg overflow-hidden">
                <Image src={metadata.image} layout="fill" alt={metadata.name}
                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
            </div>
            <div className="mt-4">
                <h2 className="text text-white font-bold">{metadata.name}</h2>
            </div>
        </Card>
    )
}