/****************************************************

*****************************************************/
//==================================================================
//==Include requre modules and files.
const Validator = Helper('validator');

const Blog = Models('Blog');
const Tag = Models('Tag');
const BlogCategory = Models('BlogCategory');
const BlogTag = Models('BlogTag');

const fs = require('fs');
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
    
        var formData = req.body;
        
        if(!req.body.tags){
         formData['tags']=[];
        }else{
            if(typeof req.body.tags=='string'){
                formData['tags']= (req.body.tags=="")?[]:[req.body.tags];
            }
        }



        formData['image']=(req.files && req.files.image)?req.files.image:'';

        let validation = new Validator(formData,{
            title : 'required',
            short_description:'required',
            description:'required',
            image:'required|mime:jpg,png',
            category:'required',
            tags:'required'
        },{
            'category.required':'Please select a category.',
            'tags.required':'Please select atleast one tag.',
        });

        try {
            let matched = await validation.check();
            
            if (!matched) {
              
                req.flash('validation_messages',validation.errors);
                req.flash('old_values',formData);
                return res.redirect('/admin/blogs/create');
            }
        } catch (error) {
        }


        let imageFile=req.files.image; 
        var file_name=Date.now()+'-'+imageFile.name;
        var path=publicPath+'/blog_images/'+file_name;
        try {
            imageFile.mv(path);
        } catch (error) {
            
        }

        
        let insertData = {
            title : formData.title,
            short_description:formData.short_description,
            description:formData.description,
            image:file_name,
            created_by:req.user.id,
            category_id:formData.category
        }

        new Blog(insertData).save().then(async (Response) => {
            let responses = Response.toJSON();
            
            var blogTagCollection = BlogTag.collection();
            formData['tags'].forEach(element => {
                blogTagCollection.add({blog_id:responses.id , tag_id: element})
            });
            
            await blogTagCollection.insert();
            req.flash('success_message','Blog successfully created.');
            return res.redirect('/admin/blogs');
 
        }).catch((errors) => {
            req.flash('error_message','Blog can not be created due to server error.');
            return res.redirect('/admin/blogs/create');
        });


    },
  
    /****************************************************      
    *****************************************************/
    show: function (req, res, next) {

        
    },
    /****************************************************      
    *****************************************************/
    edit: async function (req, res, next) {
     
        var blog_id=req.params.id;

        try {
            var blog = await Blog.where('id', blog_id).first();
            blog=blog.toJSON();
        } catch (error) {
            req.flash('error_message','There is some server error.');
            return res.redirect('/admin/blogs');
        }


        var description=escape(blog.description);

        if(!blog){
            req.flash('success_message','Blog not found');
            return res.redirect('/admin/blogs');
        }

        var tags=await Tag.select(['id','tag_name']).get();
        var categories=await BlogCategory.select(['id','category_name']).get();

        return res.render('admin/blog/edit',{description:description,blog:blog,tags:tags.toJSON(),categories:categories.toJSON(), old_values: req.flash('old_values'), validation_messages: req.flash('validation_messages') });
      



    },
    /****************************************************      
    *****************************************************/
    update: async function (req, res, next) {
  
    },
    /****************************************************      
    *****************************************************/
    destroy: async (req, res, next)=>{
        var blog_id=req.params.id;
        
        
        try {
            var blog = await Blog.where('id', blog_id).first();
            blog=blog.toJSON();
        } catch (error) {
            return res.status(500).send({message:"Server error"});
        }
       
        if(!blog){
            return res.status(400).send({message:"Blog not found"});
        }else{

            const path=publicPath+'/blog_images/'+blog.image;

            try {
                if (fs.existsSync(path)) {
                    fs.unlinkSync(path);
                }
            } catch(err){
                console.error(err)
            }

            
            await BlogTag.where('blog_id',blog_id).delete();
            await Blog.where('id', blog_id).delete();
            return res.status(200).send({message:'Blog Deleted'});
        } 


    }
    //=====================================================
}
//==================================================================
module.exports = BlogController;
//==================================================================