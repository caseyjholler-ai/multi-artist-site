import { supabase } from '@/lib/supabase'

async function getArtistAndArtworks(slug: string) {
  const { data: artist } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .single()

  if (!artist) return { artist: null, artworks: [] }

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*')
    .eq('artist_id', artist.id)
    .eq('status', 'available')

  return { artist, artworks: artworks || [] }
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const { artist, artworks } = await getArtistAndArtworks(slug)

  if (!artist) return <p className="p-8">Artist not found.</p>

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <a href="/" className="text-blue-500 text-sm mb-8 block">← Back to all artists</a>
        <h1 className="text-4xl font-bold mb-2">{artist.name}</h1>
        <p className="text-gray-500 mb-12">{artist.bio}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artworks.map((artwork: any) => (
            <div key={artwork.id} className="bg-white rounded-xl shadow p-6">
              {artwork.image_url && (
                <img
                  src={artwork.image_url}
                  alt={artwork.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <h2 className="text-xl font-semibold">{artwork.title}</h2>
              <p className="text-gray-500 mt-1">{artwork.description}</p>
              <p className="text-green-600 font-bold mt-2">${artwork.price}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
