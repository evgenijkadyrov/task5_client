import './App.css';
import {Table} from "antd";
import {Regions, RegionSelect} from "@components/regionSelect";
import {ErrorsInput} from "@components/errorsInput";
import {SeedInput} from "@components/seedInput";
import {useSeedChange} from "@/hooks/useSeedChange";
import {useUsers} from "@/hooks/useUsersFetch";
import {generateErrorDataRecords} from "@/services/errors";
import {useCallback, useState} from "react";

const columns = [
    {
        title: "N",
        dataIndex: "counter",
        width: '5%',
    },
    {
        title: "userId",
        dataIndex: "id",
        width: '30%',
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
    const [region, setRegion] = useState<Regions>('USA');
    const {seed, handleSeedChange} = useSeedChange()
    const {data, isLoading, setData, setPagination} = useUsers(seed, region)

    const handleValueChange = useCallback((newValue: string) => {
        setErrors(+newValue);
    }, [setErrors])
    const handleChangeRegion = useCallback((region: Regions) => {
        setRegion(region);
        setPagination({pageSize: 20, current: 1,})
        setData([])
    }, [setRegion,setPagination])

    const errorDataRecords = generateErrorDataRecords(data, errors);


    return (
        <div className={'container'}>
            <RegionSelect handleRegionChange={handleChangeRegion} region={region}/>
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
                    y: 700
                }}
            />
        </div>
    );
};

export default App;