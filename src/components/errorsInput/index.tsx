import {ChangeEvent, useState} from 'react';
import {Input, Space} from "antd";

export const ErrorsInput = () => {

    const [value, setValue] = useState('0');
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
    };


    return (
        <div>
            <label htmlFor="errors">Errors:  </label>
            <Space size={[8, 16]}>

                <Space.Compact>
                    <Input
                        id="errors"
                        type="range"
                        min={0}
                        step={0.5}
                        max={10}
                        value={value >= 10 ? 10 : value}
                        onChange={handleInputChange}
                    />
                </Space.Compact>
                <Space.Compact>
                    <Input
                        type="number"
                        min={0}
                        max={1000}
                        step={0.5}
                        value={value}
                        onChange={handleInputChange}
                    />
                </Space.Compact>

            </Space>
        </div>
    );
};

