const db = require('../../data/db-config');

const getAll = () => {
  return db('cars');
};

const getById = (id) => {
  return db('cars').where('id', id).first();
};

const create = async (car) => {
  const [id] = await db('cars').insert(car);
  return getById(id);
};

const updateById = async (id, car) => {
  await db('cars').where('id', id).update(car);
  return getById(id);
};

const deleteById = async (id) => {
  const deletedCar = await getById(id);
  await db('cars').where('id', id).del();
  return deletedCar;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
