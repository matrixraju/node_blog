
const Validator = Helper('validator');
const slugify = require('slug-generator');
const base64Img = require('base64-img');
const Blog = Models('Blog');
//==================================================================
const BlogController = {

    index: async function (req, res, next) {

        let relationShip = [];
        let creator = {
            'creator': function (q) {
                this.select('id','email');
            },                
        };
        relationShip.push(creator);

        let relation_params = Object.assign(
            { withRelated: relationShip }
        );


        Blog.fetchAll(relation_params).then((Response) => {
            let responses = Response.toJSON();
            //console.log(responses);
            return res.status(200).json(res.fnSuccess(Response));
        }).catch((errors) => {
            return res.status(400).json(res.fnError(errors));
        });
    },

}
//==================================================================
module.exports = BlogController;
//==================================================================