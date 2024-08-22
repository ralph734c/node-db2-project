// STRETCH
const cars = [
  {
    vin: '1111111111111',
    make: 'Toyota',
    model: 'Highlander',
    mileage: 90238,
    title: 'Clean',
    transmission: 'Automatic',
  },
  {
    vin: '2222222222222',
    make: 'Mazda',
    model: 'CX-5',
    mileage: 2100,
    title: 'Salvage',
  },
  {
    vin: '3333333333333',
    make: 'Audi',
    model: 'A4',
    mileage: 183008,
  },
];

exports.seed = async function (knex) {
  await knex('cars').truncate();
  await knex('cars').insert(cars);
};
