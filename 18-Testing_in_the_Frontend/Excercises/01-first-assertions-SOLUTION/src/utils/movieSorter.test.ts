// oxlint-disable vitest/prefer-expect-assertions -- Direkte Assertions reichen für diese Lernbeispiele.
import { describe, expect, test } from 'vitest';

import { sortMovies } from './movieSorter';

const matrix = { title: 'The Matrix', year: 1999, rating: 8.7, duration: 136, genre: 'Sci-Fi' };
const inception = { title: 'Inception', year: 2010, rating: 8.8, duration: 148, genre: 'Sci-Fi' };

describe('sort Movies', () => {
  test('sortiert nach Erscheinungsjahr, standardmäßig aufsteigend', () => {
    expect(sortMovies([inception, matrix], 'year')).toStrictEqual([matrix, inception]);
  });

  test('sortiert nach Bewertung absteigend', () => {
    expect(sortMovies([matrix, inception], 'rating', 'desc')).toStrictEqual([inception, matrix]);
  });

  test('sortiert Titel alphabetisch, ohne das Eingabearray zu verändern', () => {
    const movies = [matrix, inception];
    const result = sortMovies(movies, 'title');

    expect(result).toStrictEqual([inception, matrix]);
    expect(movies).toStrictEqual([matrix, inception]);
  });

  test('kann eine leere Liste sortieren', () => {
    expect(sortMovies([], 'duration')).toStrictEqual([]);
  });
});
