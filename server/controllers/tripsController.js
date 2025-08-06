const tripsController = {};
const prisma = require('../prisma');

tripsController.getTrips = async (req, res, next) => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: 'missing required userId' });
    }

    const trips = await prisma.trip.findMany({
      where: { userId: userId },
    });
    console.log('trips: ', trips);
    res.locals.trips = trips;
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
    const id = Number(req.params.id);
    if (!id) {
      return res.status(400).json({ error: 'missing required id' });
    }
    const deletedTrip = await prisma.trip.delete({ where: { id: id } });
    console.log('deletedTrip', deletedTrip);
    res.locals.deletedTrip = deletedTrip;

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
