import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import ArtistFlashWall from './ArtistFlashWall'

export default async function ArtistPage({
  params,
}: {
  params: { slug: string }
}) {
  const { data: artist } = await supabase
    .from('artists')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (!artist) notFound()

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
