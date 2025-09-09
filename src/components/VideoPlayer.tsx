'use client';

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export default function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0&modestbranding=1`;

  return (
    <div className="relative w-full h-0 pb-[56.25%] bg-gray-900 rounded-xl overflow-hidden">
      <iframe
        src={embedUrl}
        title={title}
        className="absolute top-0 left-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
