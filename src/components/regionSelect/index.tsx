import {Regions, regions, useRegionChange} from "@/hooks/useRegionChange";
import {useEffect} from "react";

export interface onChangeRegionType {
    onChangeRegion: (region: Regions) => void
}

export const RegionSelect = ({onChangeRegion}:onChangeRegionType) => {
    const {region, handleRegionChange} = useRegionChange()

    useEffect(() => {
        onChangeRegion(region)
    }, [region])

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

