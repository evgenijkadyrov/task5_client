import axios from "axios";
import {DataRecord} from "@/App";

const instance = axios.create({
    baseURL: "https://task5-server-ruby.vercel.app",
});
export const fetchFakeUsers = async (page: number, seed: string): Promise<DataRecord[]> => {

    try {
        const users: DataRecord[] = await instance.get("/data", {
            params: {
                page,
                seed,
            }
        });
        return users;
    } catch (error) {
        console.log(error)
    }


};