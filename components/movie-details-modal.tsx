"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Calendar, Film, Award } from "lucide-react"
import type { MovieDetails } from "@/lib/types"
import Image from "next/image"

interface MovieDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  movie: MovieDetails
}

export function MovieDetailsModal({ isOpen, onClose, movie }: MovieDetailsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{movie.Title}</DialogTitle>
          <DialogDescription>
            {movie.Year} • {movie.Rated} • {movie.Runtime}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 mt-4">
          <div className="aspect-[2/3] bg-gray-100 rounded-md overflow-hidden">
            {movie.Poster && movie.Poster !== "N/A" ? (
              <div className="relative w-full h-full">
                <Image
                  src={movie.Poster || "/placeholder.svg"}
                  alt={movie.Title}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  unoptimized={movie.Poster.startsWith("http")}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {movie.Genre.split(", ").map((genre) => (
                <Badge key={genre} variant="secondary">
                  {genre}
                </Badge>
              ))}
            </div>

            <p className="text-sm">{movie.Plot}</p>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">
                  <strong>{movie.imdbRating}</strong>/10 ({movie.imdbVotes} votes)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Released: {movie.Released}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Runtime: {movie.Runtime}</span>
              </div>

              <div className="flex items-center gap-2">
                <Film className="h-4 w-4" />
                <span className="text-sm">Director: {movie.Director}</span>
              </div>

              {movie.Awards !== "N/A" && (
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">{movie.Awards}</span>
                </div>
              )}
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-semibold mb-1">Cast</h4>
              <p className="text-sm">{movie.Actors}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

