export const fetchLlmResults = async (medicineId, patientDetail) => {
    if (!medicineId || !patientDetail) {
        return null;
    }
    try {
        console.log(`Reaching to LLM for ${medicineId}`);
        console.log(`With patient detail - ${patientDetail}`);
        const response = await fetch(`http://localhost:3000/api/entries/llm/${medicineId}/${patientDetail}`);
        const data = await response.json();
        console.log(data);
        return data.answer;
    } catch (error) {
        console.error('Error fetching from /search:', error);
        return null;
    }
};