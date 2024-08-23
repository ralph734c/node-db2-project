const carsModel = require('./cars-model');
const vinValidator = require('vin-validator');

const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const car = await carsModel.getById(id);
    if (car) {
      req.car = car;
      next();
    } else {
      next({ status: 404, message: `car with id ${id} is not found` });
    }
  } catch (error) {
    next(error);
  }
};

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;
  const error = { status: 400 };
  if (mileage === undefined || typeof mileage !== 'number' || isNaN(mileage)) {
    error.message = 'mileage is missing';
    next(error);
  } else if (!vin || vin.trim().length === 0) {
    error.message = 'vin is missing';
    next(error);
  } else if (!make || make.trim().length === 0) {
    error.message = 'make is missing';
    next(error);
  } else if (!model || model.trim().length === 0) {
    error.message = 'model is missing';
    next(error);
  }

  if (error.message) {
    next(error);
  } else {
    req.body.vin = req.body.vin.trim();
    req.body.make = req.body.make.trim();
    req.body.model = req.body.model.trim();
    next();
  }
};

const checkVinNumberValid = (req, res, next) => {
  const isVinValid = vinValidator.validate(req.body.vin);
  if (isVinValid) {
    next();
  } else {
    next({ status: 400, message: `vin ${req.body.vin} is invalid` });
  }
};

const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;
  try {
    const vinExists = await carsModel.getByVin(vin);
    if (vinExists) {
      next({ status: 400, message: `vin ${vin} already exists` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
};
