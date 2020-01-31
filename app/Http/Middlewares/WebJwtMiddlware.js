const jwt = require('jsonwebtoken');
const User = Models('User');
module.exports =async function (req, res, next) {

    let jwt_token = req.cookies.auth_token;
    req.test='abc';
    if (jwt_token) {
        
          try {
            var decoded =await jwt.verify(jwt_token, 'secretkey');

            try {
                var user = await User.where('id',decoded.data.id).first();
                if(user){
                    req.user=user.toJSON();
                }else{
                    req.user=null;
                    res.clearCookie('auth_token');
                }

            } catch (error) {
                req.user=null;
                res.clearCookie('auth_token');
            }

          } catch(err) {
            req.user=null;
            res.clearCookie('auth_token');
          }


 
    }else{
        req.user=null;
    }
    //==================================================================
    next();
}