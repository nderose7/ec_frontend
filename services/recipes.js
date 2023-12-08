// services/strapi.js

export async function getDynamicContent() {
  const allRecipes = [];
  let fetchMore = true;
  let page = 1;

  while (fetchMore) {
    try {
      const response = await fetch(`https://api.eatclassy.com/api/recipes?pagination[page]=${page}`);
      const { data } = await response.json(); // Destructure to get data array

      // Map the data to extract attributes and then spread into allRecipes
      allRecipes.push(...data.map(item => item.attributes));

      // Check if there are more pages to fetch
      fetchMore = data.length > 0;
      page++;
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
      fetchMore = false; // Stop fetching if an error occurs
    }
  }

  return allRecipes;
}


