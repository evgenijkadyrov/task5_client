import {ChangeEvent, FC} from "react";
import 'src/components/inputCustom/styles.css'
interface InputCustomProps {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    min?:number;
    max?:number
}

export const InputCustom: FC<InputCustomProps> = ({ label, value, onChange, min, max }) => {
    return (
        <div className="input-container">
            <label className="input-label">{label}</label>
            <input className="input-field" type="text" value={value} onChange={onChange} min={min} max={max}/>
        </div>
    );
};

