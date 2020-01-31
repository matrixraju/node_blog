
exports.up = function(knex) {
    return knex.schema.createTable('blogs', function(table) {
        table.increments('id').primary();
        table.string('title');
        table.text('short_description');
        table.text('description');
        table.string('image');
        table.boolean('allow_comments').defaultTo(true);
        table.integer('created_by').unsigned();
        table.integer('category_id').unsigned();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

        table.foreign('created_by').references('users.id').onDelete('CASCADE');
        table.foreign('category_id').references('blog_categories.id').onDelete('CASCADE');

      }).createTable('tags', function(table) {
        table.increments('id').primary();
        table.string('tag_name');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());

      }).createTable('blogs_tags', function(table) {
        table.integer('blog_id').unsigned().references('blogs.id')
        table.integer('tag_id').unsigned().references('tags.id')
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('blogs_tags')
    .dropTable('tags')
    .dropTable('blogs')
};
