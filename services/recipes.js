// services/strapi.js

export async function getDynamicContent() {
  const allRecipes = [];
  let fetchMore = true;
  let page = 1;

  while (fetchMore) {
    try {
      const response = await fetch(`https://api.eatclassy.com/api/recipes?pagination[page]=${page}&populate[0]=image`);
      const { data } = await response.json();
      
      if (data.length === 0) {
        fetchMore = false;
      } else {
        allRecipes.push(...data.map(item => ({
          uid: item.attributes.uid,
          imageUrl: item.attributes.image.data.attributes.url  // Extract the image URL
        })));
        page++;
      }
    } catch (error) {
      console.error('Error fetching dynamic content:', error);
      fetchMore = false;
    }
  }

  return allRecipes;
}

