
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Landmark, Mountain, Sunrise, Wind, Play, Pause, TrainFront, Store, CloudRain } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


const culturalMusic = [
  {
    id: 1,
    title: 'Echoes of the Taj',
    location: 'Agra, Uttar Pradesh',
    description: 'A serene sitar melody that evokes the timeless beauty and grandeur of the Taj Mahal at dawn.',
    audioSrc: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sound_of_Sitar.ogg',
    icon: Landmark,
  },
  {
    id: 2,
    title: 'Ganges Morning Chant',
    location: 'Varanasi, Uttar Pradesh',
    description: 'The spiritual sounds of morning prayers and chants recorded by the sacred river Ganges in Varanasi.',
    audioSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Meditation-prayer.ogg',
    icon: Sunrise,
  },
  {
    id: 3,
    title: "Hawa Mahal's Whisper",
    location: 'Jaipur, Rajasthan',
    description: 'A haunting flute piece that captures the essence of the "Palace of Winds" and its many windows.',
    audioSrc: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Indian_flute.ogg',
    icon: Wind,
  },
  {
    id: 4,
    title: 'Rhythms of the Desert',
    location: 'Thar Desert, Rajasthan',
    description: 'Energetic folk music from the heart of the Rajasthani desert, featuring traditional drums and vocals.',
    audioSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Folk_Music_of_Rajasthan.ogg',
    icon: Mountain,
  },
  {
    id: 5,
    title: 'Delhi Market Buzz',
    location: 'Chandni Chowk, Delhi',
    description: 'The lively and chaotic ambiance of a bustling market in Old Delhi, full of vendors and chatter.',
    audioSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Indian_market.ogg',
    icon: Store,
  },
  {
    id: 6,
    title: 'Kerala Monsoon Rain',
    location: 'Kerala Backwaters',
    description: 'The gentle and soothing sound of monsoon rain falling on lush greenery and tranquil waters.',
    audioSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Monsoon_in_Kerala.ogg',
    icon: CloudRain,
  },
  {
    id: 7,
    title: 'Himalayan Steam Train',
    location: 'Darjeeling, West Bengal',
    description: "The classic chugging and whistle of the Darjeeling Himalayan Railway's steam engine.",
    audioSrc: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Darjeeling_Himalayan_Railway_steam_engine_sound.ogg',
    icon: TrainFront,
  },
  {
    id: 8,
    title: 'Wind in the Himalayas',
    location: 'Himalayan Range',
    description: 'The raw sound of strong winds blowing through the high altitude peaks of the Himalayas.',
    audioSrc: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Wind_in_the_Himalayas.ogg',
    icon: Mountain,
  },
];

type CulturalMusicTrack = typeof culturalMusic[0];

export default function MusicPage() {
    const [playingId, setPlayingId] = useState<number | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [currentTrack, setCurrentTrack] = useState<CulturalMusicTrack | null>(null);

    useEffect(() => {
      const audio = audioRef.current;
      if (audio) {
        if (currentTrack) {
          if (audio.src !== currentTrack.audioSrc) {
            audio.src = currentTrack.audioSrc;
          }
          audio.play().catch(e => console.error("Audio playback failed:", e));
          setPlayingId(currentTrack.id);
        } else {
          audio.pause();
          setPlayingId(null);
        }
      }
    }, [currentTrack]);
  
    const handlePlayPause = (track: CulturalMusicTrack) => {
      if (playingId === track.id) {
        setCurrentTrack(null);
      } else {
        setCurrentTrack(track);
      }
    };
    
    const onEnded = () => {
      setCurrentTrack(null);
    }

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <audio ref={audioRef} onEnded={onEnded} />
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline tracking-wide">Sounds of Heritage</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80">
          Listen to the soundscapes of India's most iconic landmarks and cultural centers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {culturalMusic.map((track) => {
          const Icon = track.icon;
          const isPlaying = playingId === track.id;
          return (
            <Card key={track.id} className={cn("parchment flex flex-col transition-shadow", isPlaying && "shadow-lg ring-2 ring-primary")}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <CardTitle className="font-headline text-2xl">{track.title}</CardTitle>
                        <CardDescription>{track.location}</CardDescription>
                    </div>
                    <Icon className="h-8 w-8 text-primary flex-shrink-0" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow flex flex-col justify-between gap-4">
                <p className="text-foreground/80">{track.description}</p>
                <Button onClick={() => handlePlayPause(track)} variant="outline" className="mt-auto">
                    {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
                    {isPlaying ? 'Pause' : 'Play'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
