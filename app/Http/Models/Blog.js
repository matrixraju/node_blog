const result = require('dotenv').config();
const applicationApp = Config('app');

let blogModel = dbConn.Model.extend({
    tableName: 'blogs',
    creator() {
        return this.belongsTo(Models('User'),'created_by','id');
    },
    category() {
        return this.belongsTo(Models('BlogCategory'),'category_id','id');
    },
    tags() {
        return this.belongsToMany(Models('Tag'));
    }
});

module.exports = blogModel;