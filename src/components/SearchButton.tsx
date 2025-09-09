'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { LearningTrack, Course, Lesson } from '@/types';
import SearchModal from './SearchModal';

interface SearchButtonProps {
  tracks: LearningTrack[];
  courses: Course[];
  lessons: Lesson[];
}

export default function SearchButton({ tracks, courses, lessons }: SearchButtonProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === '/' || (e.metaKey && e.key === 'k')) {
      e.preventDefault();
      setIsSearchOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        onKeyDown={handleKeyDown}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
      >
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
        <span className="text-gray-500 hidden sm:block">Search...</span>
        <kbd className="hidden sm:inline-flex items-center px-2 py-1 bg-gray-200 text-gray-500 text-xs rounded">
          ⌘K
        </kbd>
      </button>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        tracks={tracks}
        courses={courses}
        lessons={lessons}
      />
    </>
  );
}
