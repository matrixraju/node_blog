/****************************************************

*****************************************************/
//==================================================================
//==Include requre modules and files.
const Validator = Helper('validator');

const BlogCategory = Models('BlogCategory');
var im = require('imagemagick');

//==================================================================
const BlogCategoryController = {
    /****************************************************      
    *****************************************************/
    index: async function (req, res, next) {
       return res.render('admin/blogCategory/index');
    },
    load_ajax_blog_categories: async (req, res, next)=>{

        var categories=await BlogCategory.select(['id','category_name','image','description','created_at']).get();
        var categories=categories.toJSON();

        return res.send({
        "data":categories
        });

    },
    /****************************************************      
    *****************************************************/
    create: async function (req, res, next) {
       return res.render('admin/blogCategory/create',{old_values: req.flash('old_values'), validation_messages: req.flash('validation_messages') });
    },
    /****************************************************      
    *****************************************************/
    store: async function (req, res, next) {

        let formData = req.body;
        
        formData['image']=(req.files && req.files.image)?req.files.image:'';

        let validation = new Validator(formData,{
            category_name : 'required|unique:blog_categories',
            description:'required',
            image:'required|mime:jpg,png'
        });

        try {
            let matched = await validation.check();
            
            if (!matched) {
                req.flash('validation_messages',validation.errors);
                req.flash('old_values',req.body);
                return res.redirect('/admin/blog-categories/create');
            }
        } catch (error) {
        }

        let imageFile=req.files.image; 
        var file_name=Date.now()+'-'+imageFile.name;
        var path=publicPath+'/blog_category_images/'+file_name;
        try {
            imageFile.mv(path);
        } catch (error) {
            
        }
         
        var dest_path=publicPath+'/blog_category_images/100X130/'+file_name;
        im.resize({
            srcPath: path,
            dstPath: dest_path,
            width:   130
          }, function(err, stdout, stderr){
            if (err) console.err;
           
        });
        
        let insertData = {
            category_name : formData.category_name,
            description:formData.description,
            image:file_name
        }

        new BlogCategory(insertData).save().then((Response) => {
            let responses = Response.toJSON();
            req.flash('success_message','Category successfully created.');
            return res.redirect('/admin/blog-categories');

        }).catch((errors) => {
            req.flash('error_message','Category can not be created due to server error.');
            return res.redirect('/admin/blog-categories/create');
        });
       




    },

    /****************************************************      

    *****************************************************/
    show: function (req, res, next) {
     
    },
    /****************************************************      
    *****************************************************/
    edit: async function (req, res, next) {

    },
    /****************************************************      
    *****************************************************/
    update: async function (req, res, next) {

    },
    /****************************************************      

    *****************************************************/
    destroy: function (req, res, next) {

    }
    //=====================================================
}
//==================================================================
module.exports= BlogCategoryController;
//==================================================================