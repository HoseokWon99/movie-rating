import { Injectable } from "@nestjs/common";
import axios, { AxiosInstance, AxiosResponse } from "axios";
import * as process from "node:process";

@Injectable()
export class TMDBClient {

    private readonly _axiosInstance: AxiosInstance = axios.create({
        baseURL: "https://api.themoviedb.org/3",
        headers: {
            Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
            Accept: "application/json; charset=utf-8"
        }
    });

    async get<T=any>(
        path: string,
        queries?: Record<string, any>
    ) {

        const res: AxiosResponse<T, any>
            = await this._axiosInstance.get(path, { params: queries });

        if (res.status !== 200) throw Error(res.statusText);
        return res.data;
    }


}