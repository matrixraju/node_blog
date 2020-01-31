
const Validator = Helper('validator');
const jwt = require('jsonwebtoken');
const User = Models('User');
const bcrypt=require('bcryptjs');
//==================================================================
const AuthController = {
 
    login:  function (req, res, next) {
        
        res.render('admin/auth/login',{old_values: req.flash('old_values'), validation_messages: req.flash('validation_messages') });
    },
    postLogin: async function (req, res, next) {

        let formData = req.body;

        let validation = new Validator(formData, {
            email : 'required',
            password: 'required'   
        });

        try {
            let matched = await validation.check();
            
            if (!matched) {
                req.flash('validation_messages',validation.errors);
                req.flash('old_values',req.body);
                res.redirect('/admin/login');
            }
        } catch (error) {
         
        }
        
        var user = await User.where('email', req.body.email).where('is_admin',true).first();
        if(!user){
          
            req.flash('error_message','Incorrect Credentials');
           return res.redirect('/admin/login');
        }else{
            var user=user.toJSON();
            if(bcrypt.compareSync(req.body.password, user.password)){
                
                var token=jwt.sign({
                    data: user
                  }, 'secretkey', { expiresIn: '1h' });

                res.cookie("auth_token", token); 
                return  res.redirect('/admin/dashboard');
                
            }else{
             
                req.flash('error_message','Incorrect Credentials');
                return res.redirect('/admin/login');
            }
        }
       
    },
    register: async function (req, res, next) {
       
    },
    //=====================================================
}
//==================================================================
module.exports = AuthController;
//==================================================================