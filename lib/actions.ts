"use server"

import type { MovieDetails, SearchResponse } from "@/lib/types"

export async function searchMovies(query: string) {
  try {
    // API key from environment variable
    const apiKey = process.env.OMDB_API_KEY

    if (!apiKey) {
      return {
        error: "API key is missing. Please set the OMDB_API_KEY environment variable.",
      }
    }

    // Fetch data from OMDB API
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data: SearchResponse = await response.json()

    if (data.Response === "False") {
      return {
        error: data.Error || "No results found",
        movies: [],
      }
    }

    return {
      movies: data.Search || [],
      totalResults: data.totalResults,
    }
  } catch (error) {
    console.error("Error searching movies:", error)
    return {
      error: "Failed to search movies. Please try again later.",
      movies: [],
    }
  }
}

export async function getMovieDetails(imdbId: string): Promise<MovieDetails> {
  try {
    // Get API key from environment variable
    const apiKey = process.env.OMDB_API_KEY

    if (!apiKey) {
      throw new Error("API key is missing")
    }

    // Fetch movie details from OMDB API
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbId}&plot=full`)

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const data = await response.json()

    if (data.Response === "False") {
      throw new Error(data.Error || "Failed to get movie details")
    }

    return data as MovieDetails
  } catch (error) {
    console.error("Error fetching movie details:", error)
    throw error
  }
}

