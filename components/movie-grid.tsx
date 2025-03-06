import type { Movie } from "@/lib/types"
import { MovieCard } from "@/components/movie-card"

interface MovieGridProps {
  movies: Movie[]
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  )
}

