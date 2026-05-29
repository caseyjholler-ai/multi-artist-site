import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import ArtistFlashWall from './ArtistFlashWall'
import ArtistGothicGallery from './ArtistGothicGallery'

export default async function ArtistPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: artist, error: artistError } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', slug)
    .single()

  if (artistError || !artist) {
    console.error('Artist not found:', slug, artistError)
    notFound()
  }

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*')
    .eq('artist_id', artist.id)
    .eq('status', 'available')
    .order('created_at', { ascending: true })

  const theme = artist.theme ?? 'sketchbook'

  if (theme === 'gothic') {
    return (
      <ArtistGothicGallery
        artistName={artist.name}
        artistBio={artist.bio}
        artworks={artworks ?? []}
      />
    )
  }

  return (
    <ArtistFlashWall
      artistName={artist.name}
      artistBio={artist.bio}
      artworks={artworks ?? []}
    />
  )
}
