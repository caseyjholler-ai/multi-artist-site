import { createClient } from '@supabase/supabase-js'
import { notFound } from 'next/navigation'
import ArtistFlashWall from './ArtistFlashWall'

export default async function ArtistPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  const supabase = createClient(supabaseUrl, supabaseKey)

  const { data: artist, error: artistError } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (artistError || !artist) {
    console.error('Artist not found:', params.slug, artistError)
    notFound()
  }

  const { data: artworks } = await supabase
    .from('artworks')
    .select('*')
    .eq('artist_id', artist.id)
    .eq('status', 'available')
    .order('created_at', { ascending: true })

  return (
    <ArtistFlashWall
      artistName={artist.name}
      artistBio={artist.bio}
      artworks={artworks ?? []}
    />
  )
}
