export interface Genre {
    id: number;
    name: string;
}

export interface Country {
    iso_3166_1: string;
}

export interface Content {
    id: number;
    overview: string | null;
    poster_path: string | null;
    genres: Genre[];
    production_countries: Country[];
}

