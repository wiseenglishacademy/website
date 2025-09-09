import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getAllTracks, getAllCourses } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Learning Tracks - Wise English Academy',
  description: 'Explore all Islamic jurisprudence learning tracks including Maliki, Hanafi, Shafi\'i, and Hanbali schools of thought.',
};

export default async function TracksPage() {
  const [tracks, courses] = await Promise.all([
    getAllTracks(),
    getAllCourses()
  ]);

  // Group courses by track
  const tracksWithCourses = tracks.map(track => ({
    ...track,
    courses: courses.filter(course => course.trackId === track.id),
    courseCount: courses.filter(course => course.trackId === track.id).length
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Learning Tracks
          </h1>
          <p className="text-xl text-gray-600">
            Choose your path in Islamic jurisprudence and deepen your understanding of Islamic law
          </p>
        </div>
      </div>

      {/* Tracks Grid */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tracksWithCourses.map((track) => (
            <div key={track.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src={track.thumbnailImage}
                  alt={track.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <h2 className="text-2xl font-bold mb-2">{track.name}</h2>
                  <p className="text-sm opacity-90">{track.courseCount} courses available</p>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 mb-6 line-clamp-3">
                  {track.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <Link
                    href={`/tracks/${track.slug}`}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    Explore Track
                  </Link>
                  
                  <span className="text-sm text-gray-500">
                    {track.courseCount} courses
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
