export type NowPlaying = {
  dates: NPDates;
  page: number;
  results: MovieResult[];
  total_pages: number;
  total_results: number;
};

export type TopRated = {
  page: number;
  results: MovieResult[];
};

export type MovieDetailType = {
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: Genres[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
} & Omit<MovieResult, "genre_ids">;

export type RecommendationMovie = Omit<NowPlaying, "dates">;

export type SearchMovie = Omit<NowPlaying, "dates">;

export type FavoritesMovie = Omit<NowPlaying, "dates">;

export type WatchlistMovie = {
  results: ({ media_type: string } & MovieResult)[];
} & Omit<NowPlaying, "dates" | "results">;

export type Genres = {
  id: number;
  name: string;
};
export type NPDates = {
  maximum: string;
  minimum: string;
};

export type MovieResult = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};
