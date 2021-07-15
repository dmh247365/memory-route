module.exports = (fn) => {
  const result = (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
  return result;
};
