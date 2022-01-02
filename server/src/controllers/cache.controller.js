import cache from "../../../cache/cache";

const list = (req, res) => {
  res.status(200).json(cache);
};

export default { list };
