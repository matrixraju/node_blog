
module.exports = function (req, res, next) {
  
    if(!req.user){
    req.flash('error_message','Please sign in to access this page.');    
    return res.redirect('/admin/login');  
  
    }else{
        if(!req.user.is_admin){
           req.flash('error_message','Please sign in to access this page.');    
           return res.redirect('/admin/login');  
          
        }
    }
    next();
}

//==================================================================