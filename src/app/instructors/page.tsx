import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { AcademicCapIcon, BookOpenIcon, UsersIcon, StarIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'Expert Instructors - WISE English Academy',
  description: 'Learn from qualified Islamic scholars and experienced teachers. Our instructors are experts in Islamic jurisprudence, Quranic studies, and Islamic sciences.',
  keywords: [
    'Islamic instructors',
    'Islamic scholars',
    'Islamic teachers',
    'Quran teachers',
    'Fiqh experts',
    'Islamic jurisprudence teachers',
    'Islamic education experts',
    'Muslim scholars',
    'Islamic studies professors'
  ],
};

const instructors = [
  {
    id: 'mufti-abdullah',
    name: 'Mufti Abdullah',
    title: 'Senior Islamic Scholar',
    bio: 'Mufti Abdullah is a distinguished Islamic scholar with over 20 years of experience in teaching Islamic jurisprudence. He specializes in Hanafi and Maliki schools of thought and has authored several books on Islamic law.',
    image: '/instructors/mufti-abdullah.jpg',
    specialties: ['Hanafi Fiqh', 'Maliki Fiqh', 'Islamic Law', 'Quranic Studies'],
    courses: ['Essentials of Islam', 'Ultimate Conspectus'],
    experience: '20+ years',
    education: 'Al-Azhar University, Cairo',
    languages: ['English', 'Arabic', 'Urdu']
  },
  {
    id: 'shaykh-tarek',
    name: 'Shaykh Dr. Tarek Elgawhary',
    title: 'Professor of Islamic Studies',
    bio: 'Dr. Tarek Elgawhary is a renowned Islamic scholar and professor specializing in Shafi\'i jurisprudence and Islamic theology. He has taught at prestigious Islamic institutions worldwide.',
    image: '/instructors/shaykh-tarek.jpg',
    specialties: ['Shafi\'i Fiqh', 'Islamic Theology', 'Hadith Studies', 'Arabic Language'],
    courses: ['Riyad as-Salihin Explained'],
    experience: '15+ years',
    education: 'Al-Azhar University, Cairo',
    languages: ['English', 'Arabic', 'French']
  },
  {
    id: 'shaykh-ahmad',
    name: 'Shaykh Ahmad Zayn al-Habashi',
    title: 'Islamic Scholar & Author',
    bio: 'Shaykh Ahmad is a respected Islamic scholar known for his comprehensive works on Islamic creed and jurisprudence. His teachings focus on practical application of Islamic principles.',
    image: '/instructors/shaykh-ahmad.jpg',
    specialties: ['Islamic Creed', 'Hanbali Fiqh', 'Islamic Ethics', 'Spiritual Development'],
    courses: ['Essentials of Islam'],
    experience: '18+ years',
    education: 'Islamic University of Medina',
    languages: ['English', 'Arabic']
  }
];

export default function InstructorsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'WISE English Academy',
    description: 'Premier Islamic learning platform with expert instructors',
    url: 'https://wiseenglishacademy.org',
    sameAs: [
      'https://twitter.com/wiseenglishacademy',
      'https://facebook.com/wiseenglishacademy',
      'https://youtube.com/wiseenglishacademy'
    ],
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Islamic Studies Certification',
      description: 'Certification in Islamic jurisprudence and sciences'
    },
    employee: instructors.map(instructor => ({
      '@type': 'Person',
      name: instructor.name,
      jobTitle: instructor.title,
      description: instructor.bio,
      knowsAbout: instructor.specialties,
      alumniOf: instructor.education
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Expert Instructors
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Learn from qualified Islamic scholars and experienced teachers who are experts in their respective fields of Islamic knowledge.
            </p>
          </div>
        </div>

        {/* Instructors Grid */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {instructors.map((instructor) => (
              <div key={instructor.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="relative h-64">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold">{instructor.name}</h3>
                    <p className="text-sm opacity-90">{instructor.title}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {instructor.bio}
                  </p>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-500">
                      <AcademicCapIcon className="w-4 h-4 mr-2" />
                      <span>{instructor.education}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <UsersIcon className="w-4 h-4 mr-2" />
                      <span>{instructor.experience} experience</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <BookOpenIcon className="w-4 h-4 mr-2" />
                      <span>{instructor.courses.length} courses</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      {instructor.languages.map((language) => (
                        <span
                          key={language}
                          className="px-2 py-1 bg-secondary-100 text-secondary-800 rounded-full text-xs font-medium"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={`/instructors/${instructor.id}`}
                    className="block w-full bg-primary-500 hover:bg-primary-600 text-white text-center py-3 rounded-lg font-semibold transition-colors duration-300"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Our Instructors */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Instructors?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our instructors are carefully selected based on their expertise, teaching experience, and commitment to Islamic education.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AcademicCapIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Qualified Scholars</h3>
                <p className="text-gray-600">All instructors hold degrees from prestigious Islamic universities</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpenIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Expert Knowledge</h3>
                <p className="text-gray-600">Specialized expertise in various fields of Islamic sciences</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UsersIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Teaching Experience</h3>
                <p className="text-gray-600">Years of experience in Islamic education and student guidance</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <StarIcon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Proven Track Record</h3>
                <p className="text-gray-600">Successful teaching methods and student outcomes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
