const userController = {};

const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

userController.createUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required.' });
    }
    const hashedPassword = await bcrypt.hash(password, 3);

    const newUser = await prisma.user.create({
      data: { username, password: hashedPassword },
    });
    res.locals.newUser = newUser;

    return next();
  } catch (e) {
    if (e.code && e.code === 'P2002') {
      return next({
        log: `username already exists: ${e}`,
        status: 409,
        message: { err: 'user already exists with that username' },
      });
    }

    return next({
      log: `Error in userController.createUser: ${e}`,
      status: 500,
      message: { err: 'cant create user' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: 'Username and password are required.' });
    }

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(401).json('user does not exist');
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) {
      return res.status(401).json('incorrect password');
    }

    res.locals.user = user;
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
