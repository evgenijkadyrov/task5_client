import {useEffect, useState} from "react";
import {fetchFakeUsers} from "@/api";

export interface DataRecord {
    counter: number;
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
}

export const useUsers = (seed: string, region: string, errors: number, pagination: any) => {
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState<DataRecord[]>([]);

    const fetchUsers = async (page:number) => {
        setIsLoading(true);
        try {
            const res = await fetchFakeUsers(page, seed, region, errors);
            if (res) {
                setData((prevData) => {
                    if (page === 1) {
                        return res.data;
                    } else {
                        return [...prevData, ...res.data];
                    }
                });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchUsers(1); // Fetch the first page when the region changes
    }, [region])

    useEffect(() => {
        fetchUsers(pagination.current);
    }, [pagination, errors, seed])

    return {
        isLoading,
        data, setData
    };
};