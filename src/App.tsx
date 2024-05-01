import './App.css';
import {Table} from "antd";
import {RegionSelect} from "@components/regionSelect";
import {ErrorsInput} from "@components/errorsInput";
import {SeedInput} from "@components/seedInput";
import {useSeedChange} from "@/hooks/useSeedChange";
import {useUsers} from "@/hooks/useUsersFetch";


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

    const {seed, handleSeedChange} = useSeedChange()
    const {data, isLoading} = useUsers(seed)
    console.log(data)

    return (
        <div className={'container'}>
            <RegionSelect/>
            <ErrorsInput/>
            <SeedInput seed={seed} handleSeedChange={handleSeedChange}/>
            <Table
                columns={columns}
                dataSource={data}
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