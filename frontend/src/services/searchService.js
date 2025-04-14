export const fetchSearchResults = async (searchKey) => {
  if (!searchKey) {
    return []
  }
  try {
    const response = await fetch(`http://localhost:3000/api/search?key=${searchKey}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching from /search:', error);
    return [];
  }
};