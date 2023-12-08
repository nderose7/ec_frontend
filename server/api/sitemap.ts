// File: server/api/sitemap.ts

import { defineEventHandler, send } from 'h3';
import { getDynamicContent } from '~/services/recipes'; // adjust the path as needed

export default defineEventHandler(async (event) => {
  const recipes = await getDynamicContent();
  let sitemapXml = '<?xml version="1.0" encoding="UTF-8"?>';
  sitemapXml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  sitemapXml += 'xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">';

  // Add static URLs here if needed

  // Dynamic URLs from Strapi
  recipes.forEach((recipe) => {
    sitemapXml += `<url><loc>https://www.eatclassy.com/recipes/${recipe.uid}</loc>`;
    if (recipe.imageUrl) {
      sitemapXml += `<image:image><image:loc>${recipe.imageUrl}</image:loc></image:image>`;
    }
    sitemapXml += `</url>`;
  });

  sitemapXml += '</urlset>';

  return send(event, sitemapXml, 'application/xml');
});
