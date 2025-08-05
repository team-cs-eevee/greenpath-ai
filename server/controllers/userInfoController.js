const userInfoController = {};

userInfoController.getMapRoute = async (req, res, next) => {
  try {
    return next();
  } catch (e) {
    return next({
      log: `Error in userInfoController.getMapRoute: ${e}`,
      status: 500,
      message: { err: 'cant generate route' },
    });
  }
};

module.exports = userInfoController;
