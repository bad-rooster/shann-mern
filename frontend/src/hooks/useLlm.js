import {fetchLlmResults} from "@/services/llmService.js";

export const useLlm = () => {
    const handleLlm = async (medicineId, patientDetail) => {
        if (!medicineId ||
            medicineId.length === 0) {
            return null;
        }
        try {
            return await fetchLlmResults(medicineId, patientDetail);
        } catch (error) {
            console.error("Search error:", error);
            return null;
        }
    };
    return { handleLlm };
};