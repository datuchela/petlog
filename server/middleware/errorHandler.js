const errorHandler = async (req, res, error) => {
  console.log(error);
  res.status(500).json({ msg: "Something went wrong on the server." });
};

module.exports = errorHandler;
