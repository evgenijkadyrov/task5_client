import {Select} from "antd";

interface RegionSelectProps {
    region: Regions;
    handleRegionChange: (region: Regions) => void;
}

export type Regions = "USA" | "Poland" | "Ukraine";
export const regions: Regions[] = ["USA", "Poland", "Ukraine"];

export const RegionSelect = ({
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
                    <option key={region} value={region}>
                        {region}
                    </option>
                ))}
            </Select>
        </div>
    );
};