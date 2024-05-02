import {SeedChangeProps} from "@/hooks/useSeedChange";
import {Input, Space} from "antd";

export const SeedInput = ({seed, handleSeedChange}: SeedChangeProps) => (
    <div>
        <label htmlFor="seed">Seed: </label>
            <Space.Compact >
                <Input
                    id="seed"
                    type="number"
                    value={seed}
                    onChange={handleSeedChange}
                />
            </Space.Compact>
    </div>
);


