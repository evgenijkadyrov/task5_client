import {ChangeEvent, useState} from 'react';

export const ErrorsInput = () => {
    const [errors, setErrors] = useState(0);
    const [number, setNumber] = useState(0);
    const handleErrorsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setErrors(value);
        setNumber(value);
    };

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setNumber(value);
        setErrors(value);
    };

    return (
        <div>
            <label htmlFor="errors">Errors:</label>
            <input
                id="errors"
                type="range"
                min={0}
                max={10}
                value={errors}
                onChange={handleErrorsChange}
            />
            <input
                type="number"
                min={0}
                max={1000}
                value={number}
                onChange={handleNumberChange}
            />
        </div>
    );
};

