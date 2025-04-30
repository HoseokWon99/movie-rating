import { Content } from "./Content";
import { Credits } from "./Credits";

export interface MovieDetail extends Content {
    title: string;
    release_date: string;
    runtime: number;
    credits: Credits;
    release_dates: {
        results: Array<{
            iso_3166_1: string;
            release_dates: Array<{
                certification: string;
            }>;
        }>;
    };
}