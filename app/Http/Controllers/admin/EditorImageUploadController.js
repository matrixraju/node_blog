
const Validator = Helper('validator');
const md5 = require('md5');
const slugify = require('slug-generator');
const base64Img = require('base64-img');
const Sample = Models('Sample');
//==================================================================
const EditorImageUploadController = {
 
    upload_blog_description_image: async function (req, res, next) {


        let imageFile=req.files.file;
        
        if(imageFile.mimetype!='image/png' ){
          return  res.status(422).send({message:"invalid"});
        }else{
           
            var file_name=Date.now()+'-'+imageFile.name;
            var path=publicPath+'/editor_images/'+file_name;
            try {
                imageFile.mv(path);
            } catch (error) {
                
            }
           return res.send({
               location:'/editor_images/'+file_name
           });

        }

 
    }
    //=====================================================
}
//==================================================================
module.exports = EditorImageUploadController;
//==================================================================