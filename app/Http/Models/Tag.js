const result = require('dotenv').config();
const applicationApp = Config('app');

let tagModel = dbConn.Model.extend({
    tableName: 'tags',
    blogs() {
        return this.belongsToMany(Models('Blog'));
    }
});

module.exports = tagModel;