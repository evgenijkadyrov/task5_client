import {useCallback, useEffect, useState} from "react";
import {fetchFakeUsers} from "@/api";

export interface DataRecord {
    counter: number;
    id: string;
    name: string;
    address: string;
    phoneNumber: string;
}

export const useUsers = (seed: string, region: string) => {
    const [isLoading, setIsLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 20,
    });
    const [data, setData] = useState<DataRecord[]>([]);

    const fetchUsers = useCallback(async () => {
        setIsLoading(true);
        try {

            const res = await fetchFakeUsers(pagination.current, seed, region);
            if (res) {
                setData(data?.concat(res.data));
            }

        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }, [pagination, seed,region]);

    useEffect(() => {
        fetchUsers();
    }, [pagination])


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
                        current:  prev.current + 1,
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

    return {
        isLoading,
        data, setData,setPagination
    };
};