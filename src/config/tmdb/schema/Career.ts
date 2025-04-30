import { Content } from "./Content";
import { Cast } from "./Cast";
import { Crew } from "./Crew";

export interface Career<ContentT extends Content> {
    casts: Array<
        Omit<ContentT, "genres" | "production_countries">
        & Pick<Cast, "character">
    >;
    crews: Array<
        Omit<ContentT, "genres" | "production_countries">
        & Pick<Crew, "job">
    >;
}


