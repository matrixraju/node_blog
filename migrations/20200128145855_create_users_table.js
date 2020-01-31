
exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments();
        table.string('first_name').notNull();
        table.string('last_name').notNull();
        table.string('email').notNull();
        table.string('password').notNull(); 
        table.date('birthday').notNull();        
        table.boolean('is_login');  
        table.boolean('is_admin').defaultTo(false);       
        table.enu('status',['A', 'I', 'D']).defaultTo('I');
        table.string('ip_address');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        
    });
};

exports.down = function(knex){
    return knex.schema.dropTableIfExists('users');
};
