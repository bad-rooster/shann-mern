import {fetchLlmResults} from "@/services/llmService.js";

export const useLlm = () => {

    const handleLlm = async (medicineId) => {
        // console.log("Fetching LLM results");
        // console.log(medicineId);
        // medicineId = '67dd9bfb6c233c22ce15876d';
        if (!medicineId ||
            medicineId.length === 0) {
            console.log("Empty search key");
            return null;
        }

        try {

            const results = await fetchLlmResults(medicineId);

            console.log("Results returned data");
            console.log(results);
            return results;
        } catch (error) {
            console.error("Search error:", error);
            return null;
        }
    };

    return { handleLlm };
};