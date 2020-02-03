/****************************************************
# sampleModel            
# Page/Class name : sampleModel
# Author : 
# Created Date : 
# Functionality : 
# Purpose : . 
*****************************************************/

const result = require('dotenv').config();
const applicationApp = Config('app');

let blogTag = dbConn.Model.extend({
    tableName: 'blogs_tags',
});

module.exports = blogTag;