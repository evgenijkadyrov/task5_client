import './App.css';
import {Table} from "antd";
import {Regions, RegionSelect} from "@components/regionSelect";
import {ErrorsInput} from "@components/errorsInput";
import {SeedInput} from "@components/seedInput";
import {useUsers} from "@/hooks/useUsersFetch";
import {useCallback, useEffect, useState} from "react";
import {debounce} from "ahooks/es/utils/lodash-polyfill";
import {Picker} from "@/Picker";

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
const calendar=true
const App = () => {
    const [errors, setErrors] = useState(0);
    const [region, setRegion] = useState<Regions>('USA');
    const [seed, setSeed] = useState('0');


    const debouncedSetErrorsValue = debounce(setErrors, 800);
    const debouncedSetSeedValue = debounce(setSeed, 800);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
    });
    const {data, isLoading, setData,} = useUsers(seed, region, errors, pagination)

    const handleValueChange = useCallback((newValue: string) => {
        debouncedSetErrorsValue(+newValue);
    }, [setErrors])

    const handleChangeRegion = useCallback((region: Regions) => {
        setRegion(region);

    }, [setRegion, setPagination])

    const handleSeedChange = useCallback((seed: string) => {

        debouncedSetSeedValue(+seed);
    }, [debouncedSetSeedValue]);

    useEffect(() => {
        setPagination({pageSize: 20, current: 1})
        setData([])
    }, [region, errors])


    useEffect(() => {
        const $tableBody = document.querySelector('.ant-table-body');
        if ($tableBody) {
            const onScroll = () => {
                if (
                    Math.abs(
                        $tableBody.scrollHeight -
                        $tableBody.scrollTop -
                        $tableBody.clientHeight
                    ) < 1
                ) {
                    setPagination((prev) => ({
                        ...prev,
                        current: prev.current + 1,
                    }));
                }
            };
            if ($tableBody) {
                $tableBody.addEventListener('scroll', onScroll);
            }
            return () => {
                if ($tableBody) {
                    $tableBody.removeEventListener('scroll', onScroll);
                }
            }
        }
    }, [addEventListener]);

    return (
        <div >
            {calendar?<Picker/>:
                <>
            <RegionSelect handleRegionChange={handleChangeRegion} region={region}/>
            <ErrorsInput onValueChange={handleValueChange}/>
            <SeedInput onValueChange={handleSeedChange}/>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={'id'}
                pagination={false}
                loading={isLoading}
                scroll={{
                    scrollToFirstRowOnChange: false,
                    y: 700
                }}
            /></>}
        </div>
    );
};

export default App;