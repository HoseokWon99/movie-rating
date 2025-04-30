import { PersonDetail } from "./PersonDetail";

export interface Crew extends Omit<
    PersonDetail,
    "movie_casts" | "tv_casts" | "known_for_department"
>{
    job: string;
}