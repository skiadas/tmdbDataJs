import genresJson from './genres.json';
import moviesJson from './movies.json';

export type GenreID = number;

export interface Genre {
  readonly id: GenreID;
  readonly name: string;
}

export interface Movie {
  readonly genre_ids: GenreID[];
  readonly title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly vote_average: number;
  readonly vote_count: number;
}

const allGenres: Genre[] = validateGenres(genresJson);
const allMovies: Movie[] = moviesJson.movies;

export const allGenreIds = allGenres.map((x) => x.id);
export const genreNamesById = new Map<GenreID, string>();
export const genreIdsByName = new Map<string, GenreID>();
allGenres.forEach((el) => {
  genreNamesById.set(el.id, el.name);
  genreIdsByName.set(el.name, el.id);
});

export function moviesForGenreId(id: GenreID): Movie[] {
  return allMovies.filter((m) => m.genre_ids.includes(id));
}
export function withPopularityAtLeast(movies: Movie[], popularityCutoff: number): Movie[] {
  return movies.filter((m) => m.popularity >= popularityCutoff);
}
export function getTitles(movies: Movie[]): string[] {
  return movies.map((m) => m.title);
}
export function computeAvgPopularity(movies: Movie[]): number {
  return movies.reduce((prev, m) => prev + m.popularity, 0) / movies.length;
}
function validateGenres(genresJson: unknown): Genre[] {
  if (typeof genresJson !== 'object' || genresJson == null)
    throw new Error("genre result should be object");
  if (!('genres' in genresJson) || !Array.isArray(genresJson.genres))
    throw new Error("json result should have genres property");

  return genresJson.genres.map(validateGenre);
}

function validateGenre(g: unknown): Genre {
  if (isGenre(g)) return g;
  else throw new Error("Not a genre: " + g);
}

// type predicate
function isGenre(g: unknown): g is Genre {
  if (typeof g !== 'object' || g == null) return false;
  const idOK = 'id' in g && typeof g.id === 'number';
  const nameOK = 'name' in g && typeof g.name === 'string';
  return (idOK && nameOK);
}

