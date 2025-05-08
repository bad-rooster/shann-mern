export const fetchLlmResults = async (medicineId) => {
    if (!medicineId) {
        return null;
    }
    try {
        console.log(`Reaching to LLM for ${medicineId}`);
        const response = await fetch(`http://localhost:3000/api/entries/llm/${medicineId}`);
        const data = await response.json();
        console.log(data);
        return data.answer;
    } catch (error) {
        console.error('Error fetching from /search:', error);
        return null;
    }
};