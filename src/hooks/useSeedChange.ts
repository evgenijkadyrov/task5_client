import {ChangeEvent, useState} from "react";

interface SeedChangeProps{
    seed: string
    handleSeedChange:(event: ChangeEvent<HTMLInputElement>)=>void
}
export const useSeedChange=():SeedChangeProps=>{
    const [seed, setSeed] = useState('1');
    const handleSeedChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSeed(event.target.value);
    };
    return {seed,handleSeedChange}
}