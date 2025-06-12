function adminOnly(req, res, next) {
  const role = req.headers["x-role"];
  if (role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
}

module.exports = adminOnly;
