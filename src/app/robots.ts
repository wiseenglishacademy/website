export const dynamic = 'force-static';

export default async function robots() {
  const baseUrl = 'https://wiseenglishacademy.org';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/_next/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
