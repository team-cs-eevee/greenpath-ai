const tripsController = {};
const prisma = require('../prisma');

tripsController.getTrips = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: 'missing required userId' });
    }
    const trips = await prisma.Trip.findMany({
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
  console.log("REQ BODY****", req.body);
  try {
    const { start, end, userId } = req.body;

    if (!start || !end || !userId) {
      return res.status(400).json({ error: 'missing required field' });
    }

    // Normalize addresses for duplicate checking (lowercase and trim whitespace)
    const normalizedStart = start.toLowerCase().trim();
    const normalizedEnd = end.toLowerCase().trim();

    // Check if this route already exists for this user
    const existingTrip = await prisma.Trip.findFirst({
      where: {
        start: {
          equals: normalizedStart,
          mode: 'insensitive'
        },
        end: {
          equals: normalizedEnd,
          mode: 'insensitive'
        },
        userId: userId
      }
    });

    if (existingTrip) {
      // Return the existing trip instead of creating a duplicate
      res.locals.newTrip = existingTrip;
      return next();
    }

    const newTrip = await prisma.Trip.create({ 
      data: { 
        start: normalizedStart, 
        end: normalizedEnd, 
        userId 
      } 
    });
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
    const deletedTrip = await prisma.Trip.delete({ where: { id: id } });
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
