import { Content } from "./Content";
import { Credits } from "./Credits";

export interface TVDetail extends Content {
    name: string;
    first_air_date: string;
    last_air_date: string | null;
    credits: Credits;
}