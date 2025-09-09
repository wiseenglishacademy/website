import { Metadata } from 'next';
import { AcademicCapIcon, GlobeAltIcon, UsersIcon, BookOpenIcon, HeartIcon, StarIcon } from '@heroicons/react/24/outline';

export const metadata: Metadata = {
  title: 'About WISE English Academy - Premier Islamic Learning Platform',
  description: 'Learn about WISE English Academy\'s mission to provide world-class Islamic education. Discover our commitment to excellence in Islamic jurisprudence and sciences.',
  keywords: [
    'about WISE English Academy',
    'Islamic education mission',
    'Islamic learning platform',
    'Islamic academy history',
    'Islamic education goals',
    'Muslim education',
    'Islamic studies platform'
  ],
};

const stats = [
  { label: 'Students Worldwide', value: '10,000+' },
  { label: 'Expert Instructors', value: '50+' },
  { label: 'Courses Available', value: '100+' },
  { label: 'Countries Served', value: '50+' },
];

const values = [
  {
    icon: AcademicCapIcon,
    title: 'Academic Excellence',
    description: 'We maintain the highest standards of Islamic scholarship and academic rigor in all our courses.'
  },
  {
    icon: HeartIcon,
    title: 'Spiritual Growth',
    description: 'Our platform fosters not just knowledge but spiritual development and connection with Allah.'
  },
  {
    icon: GlobeAltIcon,
    title: 'Global Access',
    description: 'We make quality Islamic education accessible to Muslims worldwide, regardless of location or background.'
  },
  {
    icon: UsersIcon,
    title: 'Community Building',
    description: 'We foster a supportive learning community where students can grow together in their Islamic journey.'
  },
  {
    icon: BookOpenIcon,
    title: 'Comprehensive Curriculum',
    description: 'Our courses cover all major areas of Islamic knowledge from jurisprudence to Quranic studies.'
  },
  {
    icon: StarIcon,
    title: 'Innovation',
    description: 'We combine traditional Islamic teaching methods with modern technology for effective learning.'
  }
];

export default function AboutPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'WISE English Academy',
    description: 'Premier Islamic learning platform providing world-class education in Islamic jurisprudence and sciences',
    url: 'https://wiseenglishacademy.org',
    foundingDate: '2020',
    mission: 'To provide accessible, high-quality Islamic education to Muslims worldwide',
    areaServed: 'Worldwide',
    educationalLevel: 'All Levels',
    hasCredential: {
      '@type': 'EducationalOccupationalCredential',
      name: 'Islamic Studies Certification',
      description: 'Comprehensive certification in Islamic jurisprudence and sciences'
    },
    sameAs: [
      'https://twitter.com/wiseenglishacademy',
      'https://facebook.com/wiseenglishacademy',
      'https://youtube.com/wiseenglishacademy'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <div className="text-center">
              <h1 className="text-5xl font-bold mb-6">
                About WISE English Academy
              </h1>
              <p className="text-xl max-w-3xl mx-auto opacity-90">
                We are dedicated to providing world-class Islamic education that combines traditional scholarship with modern learning methods.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto">
                To make authentic Islamic knowledge accessible to Muslims worldwide through innovative, 
                high-quality educational programs that preserve the integrity of traditional Islamic scholarship 
                while embracing modern teaching methodologies.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-primary-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-primary-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Values</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                These core values guide everything we do at WISE English Academy
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    WISE English Academy was founded in 2020 with a vision to bridge the gap between traditional 
                    Islamic education and modern learning needs. Our founders, experienced Islamic scholars and 
                    educators, recognized the need for accessible, high-quality Islamic education in English.
                  </p>
                  <p>
                    Starting with a small team of dedicated instructors, we have grown into a global platform 
                    serving thousands of students worldwide. Our commitment to academic excellence and spiritual 
                    development has made us a trusted name in Islamic education.
                  </p>
                  <p>
                    Today, we continue to expand our curriculum, enhance our teaching methods, and reach more 
                    students while maintaining our core values of authenticity, accessibility, and excellence.
                  </p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Key Milestones</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2020 - Foundation</h4>
                      <p className="text-gray-600 text-sm">WISE English Academy was established</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2021 - First Courses</h4>
                      <p className="text-gray-600 text-sm">Launched our first Islamic jurisprudence courses</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2022 - Global Expansion</h4>
                      <p className="text-gray-600 text-sm">Reached students in 25+ countries</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2023 - Platform Upgrade</h4>
                      <p className="text-gray-600 text-sm">Launched new learning management system</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mt-2 mr-4"></div>
                    <div>
                      <h4 className="font-semibold text-gray-900">2024 - 10,000+ Students</h4>
                      <p className="text-gray-600 text-sm">Achieved milestone of 10,000+ enrolled students</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="py-16 bg-primary-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Join Our Community</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Become part of a global community of learners dedicated to deepening their understanding of Islam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/courses"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                Browse Courses
              </a>
              <a
                href="/instructors"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors duration-300"
              >
                Meet Our Instructors
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
