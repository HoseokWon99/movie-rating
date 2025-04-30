import { Career } from "./Career";
import { MovieDetail } from "./MovieDetail";
import { TVDetail } from "./TVDetail";

export interface PersonDetail {
    id: number;
    name: string;
    known_for_department: string;
    profile_path: string | null;
    movie_casts: Career<MovieDetail>;
    tv_casts: Career<TVDetail>;
}