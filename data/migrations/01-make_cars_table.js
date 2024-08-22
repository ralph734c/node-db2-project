exports.up = function (knex) {
  return knex.schema.createTable('cars', (tbl) => {
    tbl.increments('id');
    tbl.string('vin', 128).unique().notNullable();
    tbl.string('make', 128).notNullable();
    tbl.string('model', 128).notNullable();
    tbl.decimal('mileage').unsigned().notNullable();
    tbl.string('title', 128);
    tbl.string('transmission', 128);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
