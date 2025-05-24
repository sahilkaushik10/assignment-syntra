
module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ msg: "token not found" });
  try {
    if (token === process.env.API_KEY) next();
  } catch (e) {
    return res.status(401).json({ msg: "token is not valid" });
  }
};
