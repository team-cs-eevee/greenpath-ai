const userController = {};

userController.createUser = async (req, res, next) => {
  try {
    return next();
  } catch (e) {
    return next({
      log: `Error in userController.createUser: ${e}`,
      status: 500,
      message: { err: 'cant create user' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    return next();
  } catch (e) {
    return next({
      log: `Error in userController.verifyUser: ${e}`,
      status: 500,
      message: { err: 'cant verify user' },
    });
  }
};

module.exports = userController;
