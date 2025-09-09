const fs = require('fs');
const path = require('path');

// Read CSV files
const tracksCsv = fs.readFileSync('./tracks.csv', 'utf8');
const coursesCsv = fs.readFileSync('./courses.csv', 'utf8');
const lessonsCsv = fs.readFileSync('./lessons.csv', 'utf8');

// Parse CSV to JSON
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = values[index]?.trim() || '';
    });
    data.push(obj);
  }
  
  return data;
}

// Convert tracks
const tracksData = parseCSV(tracksCsv);
const tracks = tracksData.map(track => ({
  id: track.trackID,
  name: track.name,
  thumbnailImage: track.thumbnailImage,
  slug: track.name.toLowerCase().replace(/\s+/g, '-'),
  description: `Learn ${track.name} jurisprudence and Islamic law`,
  createdAt: track['created time'],
  updatedAt: track['updated time']
}));

// Convert courses
const coursesData = parseCSV(coursesCsv);
const courses = coursesData.map(course => {
  // Extract track ID from the track reference
  const trackId = course.track.split('/').pop();
  
  return {
    id: course.courseID,
    name: course.courseName,
    description: course.courseDescription || `Comprehensive course on ${course.courseName}`,
    thumbnail: course['course thumbnail'],
    trackId: trackId,
    slug: course.courseName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
    createdAt: course['created time'],
    updatedAt: course['updated time'],
    isOngoing: false, // Can be manually set later
    instructor: 'Mufti Abdullah', // Default instructor
    duration: '12 weeks', // Default duration
    level: 'Beginner' // Default level - will be cast to proper type
  };
});

// Convert lessons
const lessonsData = parseCSV(lessonsCsv);
const lessons = lessonsData.map(lesson => ({
  id: lesson.lessonID,
  courseId: lesson.courseID,
  title: lesson.lessonName,
  thumbnail: lesson.lessonThumbURL,
  youtubeUrl: lesson.youTubeID,
  youtubeId: lesson.youTubeID?.split('v=')[1]?.split('&')[0] || '',
  downloads: {
    video: lesson.videoDownloadURL,
    audio: lesson.audioDownloadURL,
    pdf: null // Can be added later
  },
  notes: lesson.notes || '',
  duration: '45 minutes', // Default duration
  order: parseInt(lesson.lessonID.replace(/\D/g, '')) || 0,
  createdAt: lesson['created time'],
  updatedAt: lesson['updated time']
}));

// Create data directory
const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Write JSON files
fs.writeFileSync(path.join(dataDir, 'tracks.json'), JSON.stringify(tracks, null, 2));
fs.writeFileSync(path.join(dataDir, 'courses.json'), JSON.stringify(courses, null, 2));
fs.writeFileSync(path.join(dataDir, 'lessons.json'), JSON.stringify(lessons, null, 2));

// Create hero banners data
const heroBanners = [
  {
    id: 'banner-1',
    title: 'Learn Islamic Jurisprudence',
    subtitle: 'Master the four schools of Islamic law with expert guidance',
    image: '/images/hero-1.jpg',
    ctaText: 'Start Learning',
    ctaLink: '/tracks',
    isActive: true
  },
  {
    id: 'banner-2',
    title: 'Free Islamic Education',
    subtitle: 'Access comprehensive courses on Islamic sciences',
    image: '/images/hero-2.jpg',
    ctaText: 'Browse Courses',
    ctaLink: '/courses',
    isActive: true
  },
  {
    id: 'banner-3',
    title: 'Expert Instructors',
    subtitle: 'Learn from qualified Islamic scholars and teachers',
    image: '/images/hero-3.jpg',
    ctaText: 'Meet Instructors',
    ctaLink: '/instructors',
    isActive: true
  }
];

fs.writeFileSync(path.join(dataDir, 'hero-banners.json'), JSON.stringify(heroBanners, null, 2));

console.log('✅ CSV data converted to JSON successfully!');
console.log(`📊 Generated ${tracks.length} tracks, ${courses.length} courses, ${lessons.length} lessons`);
