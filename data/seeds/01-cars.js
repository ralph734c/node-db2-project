// STRETCH
const cars = [
  {
    vin: 'JTDBE32K926NXC7JF',
    make: 'Toyota',
    model: 'Highlander',
    mileage: 90238,
    title: 'Clean',
    transmission: 'Automatic',
  },
  {
    vin: '4F4YR12U9YEGX23Y6',
    make: 'Mazda',
    model: 'CX-5',
    mileage: 2100,
    title: 'Salvage',
  },
  {
    vin: 'WUADF48H87G8VNU68',
    make: 'Audi',
    model: 'A4',
    mileage: 183008,
  },
];

exports.seed = async function (knex) {
  await knex('cars').truncate();
  await knex('cars').insert(cars);
};
