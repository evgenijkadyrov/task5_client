export const SeedInput = ({seed, handleSeedChange}) => {



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

