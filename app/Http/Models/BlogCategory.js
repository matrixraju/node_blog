const result = require('dotenv').config();
const applicationApp = Config('app');

let blogCategoryModel = dbConn.Model.extend({
    tableName: 'blog_categories',
    blogs() {
        return this.hasMany(Models('Blog'));
    },
});

module.exports = blogCategoryModel;