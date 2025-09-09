'use client';

import { useState, useEffect } from 'react';
import { CheckCircleIcon, ClockIcon, PlayIcon } from '@heroicons/react/24/outline';
import { getAllLessons } from '@/lib/data';
import { Lesson } from '@/types';

interface ProgressTrackerProps {
  courseId: string;
}

export default function ProgressTracker({ courseId }: ProgressTrackerProps) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const allLessons = await getAllLessons();
        const courseLessons = allLessons
          .filter(lesson => lesson.courseId === courseId)
          .sort((a, b) => a.order - b.order);
        
        setLessons(courseLessons);
        
        // Load progress from localStorage
        const savedProgress = localStorage.getItem(`progress-${courseId}`);
        if (savedProgress) {
          setProgress(JSON.parse(savedProgress));
        }
      } catch (error) {
        console.error('Error loading lessons:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [courseId]);

  const toggleProgress = (lessonId: string) => {
    const newProgress = {
      ...progress,
      [lessonId]: !progress[lessonId]
    };
    setProgress(newProgress);
    localStorage.setItem(`progress-${courseId}`, JSON.stringify(newProgress));
  };

  const completedCount = Object.values(progress).filter(Boolean).length;
  const progressPercentage = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded mb-2"></div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Course Progress</h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{completedCount} of {lessons.length} lessons completed</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-2">
        {lessons.map((lesson, index) => (
          <div
            key={lesson.id}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              progress[lesson.id] ? 'bg-green-50 border border-green-200' : 'bg-gray-50 hover:bg-gray-100'
            }`}
          >
            <button
              onClick={() => toggleProgress(lesson.id)}
              className={`mr-3 p-1 rounded-full transition-colors ${
                progress[lesson.id] 
                  ? 'text-green-600 hover:text-green-700' 
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <CheckCircleIcon className="w-5 h-5" />
            </button>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center">
                <span className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                  {index + 1}
                </span>
                <span className={`font-medium text-sm line-clamp-1 ${
                  progress[lesson.id] ? 'text-green-800' : 'text-gray-900'
                }`}>
                  {lesson.title}
                </span>
              </div>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <ClockIcon className="w-3 h-3 mr-1" />
                <span>{lesson.duration}</span>
              </div>
            </div>
            
            <div className="ml-3">
              <PlayIcon className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {completedCount === lessons.length && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircleIcon className="w-6 h-6 text-green-600 mr-2" />
            <div>
              <h4 className="font-semibold text-green-800">Congratulations!</h4>
              <p className="text-sm text-green-700">You have completed this course.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
