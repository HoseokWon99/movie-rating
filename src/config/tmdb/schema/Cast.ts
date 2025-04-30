import { PersonDetail } from "./PersonDetail";

export interface Cast extends Omit<
    PersonDetail,
    "movie_casts" | "tv_casts" | "known_for_department"
> {
    known_for_department: "Actor";
    character: string;
}