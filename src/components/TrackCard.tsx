'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { LearningTrack } from '@/types';

interface TrackCardProps {
  track: LearningTrack;
  index: number;
}

export default function TrackCard({ track, index }: TrackCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Link href={`/tracks/${track.slug}`}>
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={track.thumbnailImage}
              alt={track.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold">{track.name}</h3>
            </div>
          </div>
          <div className="p-6">
            <p className="text-gray-600 mb-4 line-clamp-2">
              {track.description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Islamic Jurisprudence
              </span>
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-primary-600 group-hover:text-primary-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
