/****************************************************

*****************************************************/
//==================================================================
//==Include requre modules and files.
const Validator = Helper('validator');

const Tag = Models('Tag');
//==================================================================
const BlogTagController = {

    /****************************************************      
    *****************************************************/
    index: async function (req, res, next) {
        res.render('admin/blogTag/index');
    },
    load_ajax_blog_tags : async (req, res, next)=>{
    
        var tags=await Tag.select(['id','tag_name','created_at']).get();
        var tags=tags.toJSON();
        var data=[];
        if(tags.length>0){
            tags.forEach(element => {
                data.push([element.id,element.tag_name,element.created_at,'']); 
            });
        }
        return res.send({
        "data":data
        });

    },
    /****************************************************      
    *****************************************************/
    create: async function (req, res, next) {
        res.render('admin/blogTag/create',{old_values: req.flash('old_values'), validation_messages: req.flash('validation_messages') });
    },
    /****************************************************      
    *****************************************************/
    store: async function (req, res, next) {
        let formData = req.body;

        let validation = new Validator(formData,{
            tag_name : 'required|unique:tags'
        });

        try {
            let matched = await validation.check();
            
            if (!matched) {
                req.flash('validation_messages',validation.errors);
                req.flash('old_values',req.body);
                res.redirect('/admin/blog-tags/create');
            }
        } catch (error) {
         
        }

        let insertData = {
            tag_name : formData.tag_name
        }

        new Tag(insertData).save().then((Response) => {
            let responses = Response.toJSON();
            req.flash('success_message','Tag successfully created.');
            return res.redirect('/admin/blog-tags');

        }).catch((errors) => {
            req.flash('error_message','Tag can not be created due to server error.');
            return res.redirect('/admin/blog-tags/create');
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
module.exports = BlogTagController;
//==================================================================