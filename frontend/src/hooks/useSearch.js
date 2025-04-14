import { useProductStore } from "@/hooks/useProductStore.js";
import { fetchSearchResults } from "../services/searchService";

export const useSearch = () => {
  const update = useProductStore((state) => state.update);
  
  const handleSearch = async (searchKey) => {
    if (searchKey.length === 0) {
      update([])
    }
    
    try {
      const results = await fetchSearchResults(searchKey);
      
      // Log individual entries if needed
      results.forEach(entry => {
        console.log(entry);
      });
      
      update(results);
      console.log("Updated data");
    } catch (error) {
      console.error("Search error:", error);
    }
  };
  
  return { handleSearch };
};