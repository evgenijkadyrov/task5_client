import axios, {AxiosResponse} from "axios";
import {DataRecord} from "@/hooks/useUsersFetch";

const instance = axios.create({
    baseURL: "https://task5-server-ruby.vercel.app",
});
export const fetchFakeUsers = async (page: number, seed: string): Promise<{data:DataRecord[]}| undefined> => {

    try {
        const response:AxiosResponse= await instance.get("/data", {
            params: {
                page,
                seed,
            }
        });
        return response?.data
    } catch (error) {
        console.log(error)
    }


};