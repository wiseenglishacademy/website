'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Fuse from 'fuse.js';
import { LearningTrack, Course, Lesson, SearchResult } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  tracks: LearningTrack[];
  courses: Course[];
  lessons: Lesson[];
}

export default function SearchModal({ isOpen, onClose, tracks, courses, lessons }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Prepare search data
  const searchData = [
    ...tracks.map(track => ({
      type: 'track' as const,
      id: track.id,
      title: track.name,
      description: track.description,
      thumbnail: track.thumbnailImage,
      url: `/tracks/${track.slug}`,
    })),
    ...courses.map(course => ({
      type: 'course' as const,
      id: course.id,
      title: course.name,
      description: course.description,
      thumbnail: course.thumbnail,
      url: `/courses/${course.slug}`,
      trackName: tracks.find(t => t.id === course.trackId)?.name,
    })),
    ...lessons.map(lesson => ({
      type: 'lesson' as const,
      id: lesson.id,
      title: lesson.title,
      description: lesson.notes || '',
      thumbnail: lesson.thumbnail,
      url: `/courses/${courses.find(c => c.id === lesson.courseId)?.slug}/lessons/${lesson.id}`,
      courseName: courses.find(c => c.id === lesson.courseId)?.name,
      trackName: tracks.find(t => t.id === courses.find(c => c.id === lesson.courseId)?.trackId)?.name,
    })),
  ];

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
      
      // Configure Fuse.js
      const fuse = new Fuse(searchData, {
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'description', weight: 0.3 },
        ],
        threshold: 0.3,
        includeScore: true,
      });
      
      const searchResults = fuse.search(query);
      setResults(searchResults.map(result => result.item));
      setIsSearching(false);
    } else {
      setResults([]);
    }
  }, [query, searchData]);

  const handleClose = () => {
    setQuery('');
    setResults([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto"
        onClick={handleClose}
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input */}
            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, lessons, and tracks..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                  autoFocus
                />
                <button
                  onClick={handleClose}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Search Results */}
            <div className="max-h-96 overflow-y-auto">
              {isSearching ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
                  <p className="mt-2 text-gray-500">Searching...</p>
                </div>
              ) : query.trim() && results.length === 0 ? (
                <div className="p-6 text-center">
                  <p className="text-gray-500">No results found for &quot;{query}&quot;</p>
                </div>
              ) : query.trim() ? (
                <div className="p-2">
                  {results.map((result, index) => (
                    <motion.a
                      key={result.id}
                      href={result.url}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="block p-4 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={handleClose}
                    >
                      <div className="flex items-start space-x-3">
                        {result.thumbnail && (
                          <Image
                            src={result.thumbnail}
                            alt={result.title}
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              result.type === 'track' ? 'bg-blue-100 text-blue-800' :
                              result.type === 'course' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {result.type}
                            </span>
                            {result.trackName && (
                              <span className="text-xs text-gray-500">{result.trackName}</span>
                            )}
                          </div>
                          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                            {result.title}
                          </h3>
                          {result.description && (
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {result.description}
                            </p>
                          )}
                          {result.courseName && (
                            <p className="text-xs text-gray-500 mt-1">
                              Course: {result.courseName}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="p-6 text-center">
                  <MagnifyingGlassIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Start typing to search...</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
