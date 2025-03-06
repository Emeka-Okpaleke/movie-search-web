"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import type { Movie, MovieDetails } from "@/lib/types"
import { getMovieDetails } from "@/lib/actions"
import { MovieDetailsModal } from "@/components/movie-details-modal"
import Image from "next/image"

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null)
  const [loading, setLoading] = useState(false)

  const handleOpenModal = async () => {
    setLoading(true)
    try {
      const details = await getMovieDetails(movie.imdbID)
      setMovieDetails(details)
      setIsModalOpen(true)
    } catch (error) {
      console.error("Error fetching movie details:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={handleOpenModal}>
        <div className="aspect-[2/3] relative bg-gray-100">
          {movie.Poster && movie.Poster !== "N/A" ? (
            <Image
              src={movie.Poster || "/placeholder.svg"}
              alt={movie.Title}
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized={movie.Poster.startsWith("http")}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400">No Image</span>
            </div>
          )}
          {loading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-white border-t-transparent"></div>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{movie.Title}</h3>
          <p className="text-gray-500">{movie.Year}</p>
        </CardContent>
      </Card>

      {movieDetails && (
        <MovieDetailsModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} movie={movieDetails} />
      )}
    </>
  )
}

