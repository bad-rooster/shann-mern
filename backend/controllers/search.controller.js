import Entry from "../models/entry.model.js";

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
        key: 1,
        value: 1
      }
    }];

    const response = await Entry.aggregate(agg);

    res.status(200).json({success: true, data: response});

  } catch (e) {
    res.status(500).json({success: false, error: e});
  }
}