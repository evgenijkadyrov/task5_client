import {Button, Input, Space} from "antd";
import {SwapOutlined} from '@ant-design/icons';
import {ChangeEvent, useCallback, useState} from "react";

interface SeedProps {
    onValueChange: (seed: string) => void
}

export const SeedInput = ({onValueChange}: SeedProps) => {
    const [seed, setSeed] = useState('0');

    const handleSeedChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const seed = event.target.value
        setSeed(seed);
        onValueChange(seed)
    }, [setSeed]);
    const handleRandomSeed = useCallback(() => {
        const randomSeed = Math.floor(Math.random() * 1000).toString();
        setSeed(randomSeed);
        onValueChange(randomSeed);
    }, [setSeed, onValueChange]);
    return (
        <div>
            <label htmlFor="seed">Seed: </label>
            <Space.Compact>
                <Input
                    id="seed"
                    type="number"
                    value={seed}
                    onChange={handleSeedChange}
                />
                <Button onClick={handleRandomSeed}><SwapOutlined/></Button>
            </Space.Compact>
        </div>
    );
}


