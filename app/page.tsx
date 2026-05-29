import { supabase } from '@/lib/supabase'

async function getArtists() {
  const { data } = await supabase.from('artists').select('*')
  return data || []
}

export default async function Home() {
  const artists = await getArtists()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-4">ArtistShop</h1>
        <p className="text-center text-gray-500 mb-12">
          Original art from independent artists
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist: any) => (
            <a
              key={artist.id}
              href={'/artists/' + artist.slug}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6"
            >
              <h2 className="text-xl font-semibold">{artist.name}</h2>
              <p className="text-gray-500 mt-2">{artist.bio}</p>
              <p className="text-blue-500 mt-4 text-sm">View gallery →</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
