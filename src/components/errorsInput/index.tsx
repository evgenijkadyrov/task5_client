import {ChangeEvent, memo, useCallback, useState} from 'react';
import {Input, Space} from "antd";

interface ErrorProps {
    onValueChange: (value: string) => void
}

export const ErrorsInput = memo(({onValueChange}: ErrorProps) => {

    const [value, setValue] = useState('0');

    const handleInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
        onValueChange(value)
    }, [setValue, onValueChange]);

    return (
        <div>
            <label htmlFor="errors">Errors: </label>
            <Space size={[8, 16]}>
                <Space.Compact>
                    <Input
                        id="errors"
                        type="range"
                        min={0}
                        step={0.5}
                        max={10}
                        value={+value > 10 ? 10 : +value}
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
})

