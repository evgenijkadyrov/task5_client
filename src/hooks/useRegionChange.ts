import {ChangeEvent, useState} from "react";

interface RegionChangeProps {
    region: Regions
    handleRegionChange: (event: ChangeEvent<HTMLSelectElement>) => void
}

export type Regions = 'USA' | 'Poland' | 'Ukraine'
export const regions: Regions[] = ['USA', 'Poland', 'Ukraine'];

export const useRegionChange = (): RegionChangeProps => {

    const [region, setRegion] = useState(regions[0]);
    const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRegion(event.target.value as Regions);
    };
    return {region, handleRegionChange}
}