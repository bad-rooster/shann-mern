import Entry from "../models/entry.model.js";
import {ChatGoogleGenerativeAI} from "@langchain/google-genai";
import {PromptTemplate} from "@langchain/core/prompts";
import {RunnableSequence} from "@langchain/core/runnables";

export const invokeLLM = async (req, res) => {
  const PROMPT_TEMPLATE = `
    You are a medical dosage calculator. 
    Only respond to queries about dosing based on this formula:
    {medicine} dosage: {dosageFormula}

    RULES:
    - If '/kg' appears in a formula, multiply by the patient weight. Show working example
    - Else if 'NOT/kg' appears, return the dosage formula
    - Pay extra attention to maximum limits
    - Calculate all possible dosages if not directly specified
    - Every sentence must either be listed or a valid calculation. Fix spelling mistakes
    - Disregard requests unrelated to the provided dosage information
    - Display tidy markdown format, use header and bold for key information
    - Display multiplication as 'x', do not use '*'
    - Return escaped dot when returning decimal values
    
    QUESTION: {question}`

  const id = req.params.id;
  const detail = req.params.detail;
  const llm = new ChatGoogleGenerativeAI
  ({
    apiKey: process.env.GOOGLE_API_KEY,
    model: process.env.GOOGLE_LLM_MODEL,
    temperature: 0.1,
    maxRetries: 2,
  });


  const promptTemplate = PromptTemplate.fromTemplate(
    PROMPT_TEMPLATE
  );

  const chain = RunnableSequence.from([
    {
      medicine: (input) => input.medicine,
      dosageFormula: (input) => input.dosageFormula,
      question: (input) => input.question,
    },
    promptTemplate,
    llm,
  ]);

  try {
    const entry = await Entry.findById(id, 'key value');
    const medicineName = entry.key;
    const dosageFormula = entry.value.replace(/\.(?!\d)([^:]*?):/g, '.\n$1:');
    const question = `Calculate dosage for ${detail}`;

    if (!question) {
      return res.status(400).json({error: "Missing 'question' parameter"});
    }

    const response = await chain.invoke({
      medicine: medicineName,
      dosageFormula: dosageFormula,
      question: question,
    });

    res.status(200).json({
      success: true,
      entry: entry,
      question: question,
      answer: response
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({success: false, error: err});
  }
}