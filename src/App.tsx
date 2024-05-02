import './App.css';
import {Table} from "antd";
import {RegionSelect} from "@components/regionSelect";
import {ErrorsInput} from "@components/errorsInput";
import {SeedInput} from "@components/seedInput";
import {useSeedChange} from "@/hooks/useSeedChange";
import {useUsers} from "@/hooks/useUsersFetch";
import {generateErrorDataRecords} from "@/services/errors";
import {useState} from "react";

const columns = [
    {
        title: "N",
        dataIndex: "counter",
    },
    {
        title: "userId",
        dataIndex: "id",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Address",
        dataIndex: "address",
    },
    {
        title: "Phone number",
        dataIndex: "phoneNumber",
    }
];
const App = () => {
    const [errors, setErrors] = useState(0);
    const [region, setRegion] = useState('');


    console.log(region)
    const {seed, handleSeedChange} = useSeedChange()
    const {data, isLoading} = useUsers(seed, region)
    const handleValueChange = (newValue:string) => {
        setErrors(+newValue);
    };
    const handleChangeRegion = (region:string) => {
        setRegion(region);
    };
    const errorDataRecords = generateErrorDataRecords(data, errors);
    return (
        <div className={'container'}>
            <RegionSelect onChangeRegion={handleChangeRegion}/>
            <ErrorsInput onValueChange={handleValueChange}/>
            <SeedInput seed={seed} handleSeedChange={handleSeedChange}/>
            <Table
                columns={columns}
                dataSource={errorDataRecords}
                rowKey={'id'}
                pagination={false}
                loading={isLoading}
                scroll={{
                    scrollToFirstRowOnChange: false,
                    y: 600
                }}
            />
        </div>
    );
};

export default App;