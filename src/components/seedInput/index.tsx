import {SeedChangeProps} from "@/hooks/useSeedChange";


export const SeedInput = ({seed, handleSeedChange}:SeedChangeProps) => {

    return (
        <div>
            <label htmlFor="seed">Seed:</label>
            <input
                id="seed"
                type="number"
                value={seed}
                onChange={handleSeedChange}
            />
        </div>
    );
};

