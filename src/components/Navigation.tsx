'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import SearchButton from './SearchButton';
import { getAllTracks, getAllCourses, getAllLessons } from '@/lib/data';
import { LearningTrack, Course, Lesson } from '@/types';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchData, setSearchData] = useState<{
    tracks: LearningTrack[];
    courses: Course[];
    lessons: Lesson[];
  }>({
    tracks: [],
    courses: [],
    lessons: []
  });

  useEffect(() => {
    // Load search data on client side
    Promise.all([
      getAllTracks(),
      getAllCourses(),
      getAllLessons()
    ]).then(([tracks, courses, lessons]) => {
      setSearchData({ tracks, courses, lessons });
    });
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-500">
                  WISE English Academy
                </h1>
              </div>
            </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/tracks"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Learning Tracks
            </Link>
            <Link
              href="/courses"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              All Courses
            </Link>
            <Link
              href="/instructors"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Instructors
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Contact
            </Link>
            
            {/* Search Button */}
            <SearchButton {...searchData} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <SearchButton {...searchData} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 transition-colors duration-200"
            >
              {isMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/tracks"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Learning Tracks
              </Link>
              <Link
                href="/courses"
                className="text-gray-700 hover:text-green-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                All Courses
              </Link>
              <Link
                href="/instructors"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Instructors
              </Link>
              <Link
                href="/about"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
