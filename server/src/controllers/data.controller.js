import data from "../../data/sounds.json";

const list = (req, res) => {
  res.status(200).json(data.data);
};

export default { list };
