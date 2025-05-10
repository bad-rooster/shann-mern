import Entry from "../models/entry.model.js";
import {Ollama} from "@langchain/ollama";
import {PromptTemplate} from "@langchain/core/prompts";
import {RunnableSequence} from "@langchain/core/runnables";

export const searchEntry = async (req, res) => {
  try {
    const {key} = req.query;

    const agg = [{
      $search: {
        index: "medicine-title",
        autocomplete: {
          query: key,
          path: "key",
          tokenOrder: "sequential"
        }
      }
    }, {
      $limit: 5
    }, {
      $project: {
        _id: 1,
        key: 1
      }
    }];

    const response = await Entry.aggregate(agg);

    res.status(200).json({success: true, data: response});
  } catch (e) {
    console.log(e);
    res.status(500).json({success: false, error: e});
  }
}

export const getEntries = async (req, res) => {
  const key = req.params.key;
  try {
    const entries = await Entry.find({key: {'$regex': `^${key}`, '$options': 'i'}});
    res.status(200).json({success: true, data: entries});
  } catch (err) {
    console.log(err);
    res.status(500).json({success: false, error: err});
  }
}

export const invokeLLM = async (req, res) => {
  const PROMPT_TEMPLATE = `
    You are a medical dosage calculator. 
    Only respond to queries about dosing based on this formula:
    {medicine} dosage: {dosageFormula}

    RULES:
    - If '/kg' appears in a formula, multiply by the patient weight
    - Ignore any sentence containing 'NOT/kg'
    - Pay extra attention to maximum limits
    - Disregard requests unrelated to the provided dosage information
    
    QUESTION: {question}`

  const id = req.params.id;
  const detail = req.params.detail;

  const llm = new Ollama({
    model: "gemma3:12b",
    temperature: 0.1,
    maxRetries: 2,
    baseUrl: "http://host.docker.internal:11434"

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
    // const question = "Calculate dosage for a 70kg adult.";

    if (!question) {
      return res.status(400).json({error: "Missing 'question' parameter"});
    }

    // Invoke the model
    const response = await chain.invoke({
      medicine: medicineName,
      dosageFormula: dosageFormula,
      question: question,
    });

    // Return response
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