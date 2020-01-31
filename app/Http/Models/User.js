const result = require('dotenv').config();
const applicationApp = Config('app');

let userModel = dbConn.Model.extend({
    tableName: 'users',
});

module.exports = userModel;