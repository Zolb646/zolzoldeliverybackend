export const admin = (req, res, next) => {
  if (req.user && req.user.role && req.user.role.toUpperCase() === "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as admin" });
  }
};
