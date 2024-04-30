import {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {Table} from "antd";
import {fetchFakeUsers} from "@/api";
import { useVT } from "virtualizedtableforantd4";
export interface DataRecord {
    counter: number;
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
}

const regions = ['USA', 'Belarus', 'UK'];
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
const MyComponent = () => {
    const [region, setRegion] = useState(regions[0]);
    const [errors, setErrors] = useState(0);
    const [number, setNumber] = useState(0);
    const [seed, setSeed] = useState('1');
    const [pages, setPages]=useState(1)
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10
    });
     const [data, setData] = useState<DataRecord[]>([]);

    useEffect(  () => {
        const fetchUsers=async () => {
            try{
                const res = await fetchFakeUsers(pagination.current, seed)
                setData(res.data)
                setPagination((prevPagination) => ({
                    ...prevPagination,
                    current: prevPagination.current + 1,
                }));
            }catch (error){
                console.log(error)
            }
        }
        fetchUsers()
    }, [])
    const [vt] = useVT(
        () => ({
            onScroll: async ({ top, isEnd }) => {
                if (isEnd) {
                    if (data && data.length < 200) {
                        await fetchFakeUsers(pagination.current,seed);
                    }
                }
            },
            scroll: {
                y: 300
            },
            debug: false
        }),
        [data]
    );
    const handleRegionChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setRegion(event.target.value);
    };

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

    const handleSeedChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSeed(event.target.value);
    };


console.log(data)
    return (
        <div className={'container'}>
            <div className={'region'}>
                <label htmlFor="region">Region:</label>
                <select id="region" value={region} onChange={handleRegionChange}>
                    {regions.map((r) => (
                        <option key={r} value={r}>
                            {r}
                        </option>
                    ))}
                </select>
            </div>
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
            <div>
                <label htmlFor="seed">Seed:</label>
                <input
                    id="seed"
                    type="number"
                    value={seed}
                    onChange={handleSeedChange}
                />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                components={vt}
                pagination={false}
                //loading={loading}
                scroll={{
                    scrollToFirstRowOnChange: false,
                    y: 600
                }}
            />
        </div>
    );
};

export default MyComponent;