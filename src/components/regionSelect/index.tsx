import {regions, useRegionChange} from "@/hooks/useRegionChange";


export const RegionSelect = () => {
const {region,handleRegionChange}=useRegionChange()

    return (
        <div className={'region'}>
            <label htmlFor="region">Region:</label>
            <select id="region" value={region} onChange={handleRegionChange}>
                {regions.map((r) => (
                    <option key={r} value={r}>
                        {r}
                    </option>
                ))}
            </select>
        </div>
    );
};

