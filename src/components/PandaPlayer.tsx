'use client';

interface PandaPlayerProps {
  videoId: string;
}

export function PandaPlayer({ videoId }: PandaPlayerProps) {
  return (
    <iframe
      src={`https://player-vz-7b6cf9e4-8bf.tv.pandavideo.com.br/embed/?v=${videoId}`}
      style={{
        border: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%'
      }}
      allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
      allowFullScreen
    />
  );
}
