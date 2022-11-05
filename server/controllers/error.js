const error = async (req, res) => {
  res.status(404).json({ msg: "Route not found" });
};

module.exports = { error };
