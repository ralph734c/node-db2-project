const { getAll, getById, create } = require('./cars-model');

const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware');

const router = require('express').Router();

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
