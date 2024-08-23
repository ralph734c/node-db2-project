const {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} = require('./cars-model');

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware');

const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const cars = await getAll();
    res.json(cars);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', checkCarId, async (req, res, next) => {
  try {
    const car = await getById(req.params.id);
    res.json(car);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
  async (req, res, next) => {
    try {
      const newCar = await create(req.body);
      res.status(201).json(newCar);
    } catch (error) {
      next(error);
    }
  }
);

router.put('/:id', checkCarId, checkVinNumberValid, async (req, res, next) => {
  try {
    const updatedCar = await updateById(req.params.id, req.body);
    res.json(updatedCar);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', checkCarId, async (req, res, next) => {
  try {
    const deletedCar = await deleteById(req.params.id);
    res.json(deletedCar);
  } catch (error) {
    next(error);
  }
});

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
