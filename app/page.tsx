import { MovieSearch } from "@/components/movie-search"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-black">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-50">Movie Search</h1>
        <MovieSearch />
      </div>
    </main>
  )
}
