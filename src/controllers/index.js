const HomeController = {
  getHealth: async (req, res, next) => {
    try {
      return res.status(200).json({ timestamp: new Date() });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = HomeController;
