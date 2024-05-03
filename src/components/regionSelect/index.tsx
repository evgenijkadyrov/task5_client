import {Select} from "antd";
import {memo} from "react";

interface RegionSelectProps {
    region: Regions;
    handleRegionChange: (region: Regions) => void;
}

export type Regions = "USA" | "Poland" | "Ukraine";
export const regions: Regions[] = ["USA", "Poland", "Ukraine"];

export const RegionSelect = memo(({
                                 region,
                                 handleRegionChange,
                             }: RegionSelectProps) => {
    const handleRegionChangeInternal = (value: Regions) => {
        handleRegionChange(value);
    };

    return (
        <div className={"region"}>
            <label htmlFor="region">Region: </label>
            <Select style={{width: 120}} id="region" value={region}
                    onChange={handleRegionChangeInternal}>
                {regions.map((region) => (
                    <Select.Option key={region} value={region}>
                        {region}
                    </Select.Option>
                ))}
            </Select>
        </div>
    );
});