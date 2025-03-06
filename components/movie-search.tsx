"use client";

import type React from "react";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MovieGrid } from "@/components/movie-grid";
import { searchMovies } from "@/lib/actions";
import { Search, Loader2 } from "lucide-react";
import type { Movie } from "@/lib/types";
import { SearchPreview } from "@/components/search-preview";
import { useDebounce } from "@/lib/hooks";

export function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [previewMovies, setPreviewMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searched, setSearched] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce the search query to avoid making too many API calls
  const debouncedQuery = useDebounce(query, 500);

  // Handle preview search as user types
  useEffect(() => {
    const fetchPreviewResults = async () => {
      if (!debouncedQuery.trim()) {
        setPreviewMovies([]);
        setShowPreview(false);
        return;
      }

      setPreviewLoading(true);
      setShowPreview(true);

      try {
        const result = await searchMovies(debouncedQuery);

        if (result.error) {
          setPreviewMovies([]);
        } else {
          // Limit preview results to 5 movies
          setPreviewMovies(result.movies?.slice(0, 5) || []);
        }
      } catch (_) {
        setPreviewMovies([]);
      } finally {
        setPreviewLoading(false);
      }
    };

    fetchPreviewResults();
  }, [debouncedQuery]);

  // Handle full search when form is submitted
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setShowPreview(false);

    try {
      const result = await searchMovies(query);

      if (result.error) {
        setError(result.error);
        setMovies([]);
      } else {
        const movieResults = result.movies || [];
        setMovies(movieResults);
        if (movieResults.length === 0) {
          setError("No movies found. Try a different search term.");
        }
      }
    } catch (_) {
      setError("An unexpected error occurred. Please try again.");
      setMovies([]);
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  // Handle clicking outside the preview to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        setShowPreview(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle selecting a movie from the preview
  const handleSelectMovie = (movie: Movie) => {
    setQuery(movie.Title);
    setShowPreview(false);
    // Automatically search for the selected movie
    const event = { preventDefault: () => {} } as React.FormEvent;
    handleSearch(event);
  };

  return (
    <div className="space-y-6">
      <div className="relative" ref={searchInputRef}>
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Search for movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            onFocus={() => query.trim() && setShowPreview(true)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Searching
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </span>
            )}
          </Button>
        </form>

        {/* Search Preview Dropdown */}
        {showPreview && (
          <SearchPreview
            movies={previewMovies}
            loading={previewLoading}
            onSelect={handleSelectMovie}
            query={debouncedQuery}
          />
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
          {error}
        </div>
      )}

      {searched && !error && movies.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xl font-semibold">Search Results</h2>
          <MovieGrid movies={movies} />
        </div>
      )}

      {searched && !loading && !error && movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            No movies found. Try a different search term.
          </p>
        </div>
      )}

      {!searched && !showPreview && (
        <div className="text-center py-12">
          <p className="text-gray-500">Search for a movie to see results</p>
        </div>
      )}
    </div>
  );
}
