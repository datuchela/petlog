const error = async (req, res) => {
  res.status(404).json({ status: 404, msg: "Route not found" });
};

module.exports = { error };
