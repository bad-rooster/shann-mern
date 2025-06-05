export const fetchLlmResults = async (medicineId, patientDetail) => {
    if (!medicineId || !patientDetail) {
        return null;
    }
    try {
        const response = await fetch(`/api/entries/llm/${medicineId}/${patientDetail}`);
        const data = await response.json();
        return data.answer.kwargs.content;
    } catch (error) {
        console.error('Error fetching from /api/entries/llm:', error);
        return null;
    }
};