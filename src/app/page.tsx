import { Metadata } from 'next';
import HeroSlider from '@/components/HeroSlider';
import TrackCard from '@/components/TrackCard';
import CourseCard from '@/components/CourseCard';
import { getAllTracks, getAllCourses, getHeroBanners } from '@/lib/data';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Wise English Academy - Islamic Learning Platform',
  description: 'Learn Islamic jurisprudence and Islamic sciences with expert guidance. Free courses on Maliki, Hanafi, Shafi\'i, and Hanbali schools of thought.',
  keywords: 'Islamic learning, Islamic jurisprudence, Islamic courses, Maliki, Hanafi, Shafi\'i, Hanbali, Islamic education',
};

export default async function HomePage() {
  const [tracks, courses, heroBanners] = await Promise.all([
    getAllTracks(),
    getAllCourses(),
    getHeroBanners()
  ]);

  // Get latest courses (first 6)
  const latestCourses = courses.slice(0, 6);
  
  // Get ongoing courses (if any)
  const ongoingCourses = courses.filter(course => course.isOngoing);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <HeroSlider banners={heroBanners} />
        </div>
      </section>

      {/* Learning Tracks Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Learning Tracks
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the four schools of Islamic jurisprudence and deepen your understanding of Islamic law
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tracks.slice(0, 4).map((track, index) => (
              <TrackCard key={track.id} track={track} index={index} />
            ))}
          </div>
          
          {/* Fifth track centered */}
          {tracks.length > 4 && (
            <div className="flex justify-center mt-8">
              <div className="max-w-sm">
                <TrackCard track={tracks[4]} index={4} />
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Latest Courses Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Latest Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our newest courses and start your Islamic learning journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {latestCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              href="/courses"
              className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Ongoing Courses Section (if any) */}
      {ongoingCourses.length > 0 && (
        <section className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Ongoing Courses
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join these courses that are currently in progress
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingCourses.map((course, index) => (
                <CourseCard key={course.id} course={course} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Instructors</h3>
              <p className="text-gray-600">Learn from qualified Islamic scholars and experienced teachers</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">High-Quality Content</h3>
              <p className="text-gray-600">Access professionally produced video lessons and downloadable resources</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Completely Free</h3>
              <p className="text-gray-600">All courses and resources are available at no cost to promote Islamic education</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}