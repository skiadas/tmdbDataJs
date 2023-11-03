import { expect, test, describe } from 'vitest'
import { allGenreIds, moviesForGenreId, getTitles } from './script.mjs'

describe('Genres', () => {
    test('allGenresId has 19 genres', () => {
        expect(allGenreIds).to.be.not.equal(null);
        expect(allGenreIds).to.have.length(19);
    });
    test('moviesForGenreId returns correct set of movies', () => {
        const movies = moviesForGenreId(28);
        expect(movies).to.have.length(410);
        for( const m of movies) {
            expect(m.genre_ids).to.contain(28);
        }
    });
});
describe("Movies", () => {
    test('getTitles', () => {
        const movies = moviesForGenreId(28).slice(0, 3);        
        const titles = getTitles(movies);
        expect(titles).to.have.length(3);
        expect(titles[0]).to.equal(movies[0].title);
        expect(titles[1]).to.equal(movies[1].title);
        expect(titles[2]).to.equal(movies[2].title);
    });
});