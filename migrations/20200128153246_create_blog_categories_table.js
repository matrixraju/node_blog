
exports.up = function(knex) {

    return knex.schema.createTable('blog_categories', function (table) {
        table.increments();
        table.string('category_name').notNull();
        table.string('image').notNull();
        table.string('description').notNull();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('blog_categories');
};
