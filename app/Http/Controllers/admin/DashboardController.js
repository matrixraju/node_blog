
const Validator = Helper('validator');
const md5 = require('md5');
const slugify = require('slug-generator');
const base64Img = require('base64-img');
const Sample = Models('Sample');
//==================================================================
const DashboardController = {
 
    index: async function (req, res, next) {
     // console.log(req.user);
      return res.render('admin/dashboard');
    }
    //=====================================================
}
//==================================================================
module.exports = DashboardController;
//==================================================================