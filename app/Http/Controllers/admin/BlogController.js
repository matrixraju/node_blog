/****************************************************

*****************************************************/
//==================================================================
//==Include requre modules and files.
const Validator = Helper('validator');

const Blog = Models('Blog');
const Tag = Models('Tag');
const BlogCategory = Models('BlogCategory');
//==================================================================
const BlogController = {
    /****************************************************      
    *****************************************************/
    index: async function (req, res, next) {
        return res.render('admin/blog/index');
    },

    load_ajax_blogs: async (req, res, next)=>{

       var blogs=await Blog.withSelect('creator',['first_name','last_name']).withSelect('category',['category_name']).fetchAll({withRelated:[{'tags':function(){this.select(['tag_name']);}}]});
       
        var blogs=blogs.toJSON();
   
        return res.send({
           "data":blogs
        });
    },
    /****************************************************      
    *****************************************************/
    create: async function (req, res, next) {
       
        var tags=await Tag.select(['id','tag_name']).get();
        var categories=await BlogCategory.select(['id','category_name']).get();


        
        return res.render('admin/blog/create',{tags:tags.toJSON(),categories:categories.toJSON(), old_values: req.flash('old_values'), validation_messages: req.flash('validation_messages') });
    },
    /****************************************************      
    *****************************************************/
    store: async function (req, res, next) {

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
module.exports = BlogController;
//==================================================================