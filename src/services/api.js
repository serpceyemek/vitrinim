export const fetchListings = async () => {
  try {
    const response = await fetch('/api/listings'); // örnek endpoint
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API Hatası:", error);
    return [];
  }
};
