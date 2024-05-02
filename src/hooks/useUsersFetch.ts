import {useCallback, useEffect, useState} from "react";
import {fetchFakeUsers} from "@/api";

export interface DataRecord {
    counter: number;
    id: string;
    name: string;
    address: string;
    phoneNumber: string;

}

export const useUsers = (seed: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
    });
    const [data, setData] = useState<DataRecord[] |undefined>([]);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {
            if (pagination.current === 2) {
                setPagination((prev) => ({...prev, current: prev.current + 1}));
            }
            const res = await fetchFakeUsers(pagination.current, seed);
            setData([...data, ...res?.data]);

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [pagination.current, seed]);

    useEffect(() => {
        if (pagination.current === 2) return;
        fetchUsers();
    }, [fetchUsers, pagination]);

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
                        current: prev.current === 1 ? 3 : prev.current + 1,
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
    }, [pagination]);


    return {
        isLoading,
        data,
    };
};