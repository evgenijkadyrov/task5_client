import axios from "axios";
import {DataRecord} from "@/hooks/useUsersFetch";

const instance = axios.create({
    baseURL: "https://task5-server-ruby.vercel.app",
});
export const fetchFakeUsers = async (page: number, seed: string): Promise<{ data: DataRecord[] } | undefined> => {

    try {
        return await instance.get("/data", {
            params: {
                page,
                seed,
            }
        })
    } catch (error) {
        console.log(error)
    }


};