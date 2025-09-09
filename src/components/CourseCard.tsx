'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';

interface CourseCardProps {
  course: Course;
  index: number;
}

export default function CourseCard({ course, index }: CourseCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/courses/${course.slug}`}>
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="relative h-40 overflow-hidden">
            <Image
              src={course.thumbnail}
              alt={course.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                course.level === 'Beginner' ? 'bg-secondary-100 text-secondary-800' :
                course.level === 'Intermediate' ? 'bg-accent-100 text-accent-800' :
                'bg-primary-100 text-primary-800'
              }`}>
                {course.level}
              </span>
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
              {course.name}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {course.description}
            </p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{course.instructor}</span>
              <span>{course.duration}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
