const tripsController = {};
const prisma = require('../prisma');

tripsController.getTrips = async (req, res, next) => {
  try {
    return next();
  } catch (e) {
    return next({
      log: `Error in tripsController.getTrips: ${e}`,
      status: 500,
      message: { err: 'cant get trips' },
    });
  }
};

tripsController.createTrip = async (req, res, next) => {
  // create route {start, end, userId}
  //send back newly created object
  try {
    const { start, end, userId } = req.body;

    if (!start || !end || !userId) {
      return res.status(400).json({ error: 'missing required field' });
    }

    const newTrip = await prisma.trip.create({ data: { start, end, userId } });
    res.locals.newTrip = newTrip;
    return next();
  } catch (e) {
    return next({
      log: `Error in tripsController.create: ${e}`,
      status: 500,
      message: { err: 'cant create trip' },
    });
  }
};

tripsController.deleteTrip = async (req, res, next) => {
  try {
    return next();
  } catch (e) {
    return next({
      log: `Error in tipsController.deleteTrip: ${e}`,
      status: 500,
      message: { err: 'cant delete trip' },
    });
  }
};

module.exports = tripsController;
