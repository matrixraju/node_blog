 
/*
|--------------------------------------------------------------------------
| Application Helper Router Import
|--------------------------------------------------------------------------
|
*/
const Router = Helper('router');
//=========================================================================
/*
|--------------------------------------------------------------------------
| Application All Web Routes
|--------------------------------------------------------------------------
|
*/
//==Home Page Define
Router.get('/', (req, res, next) =>{    
    res.status(200).json(res.fnSuccess('Node JS Frame v0.1 Web is Running ........')); 
});
//=========================================================================







Router._group('/admin',function (Router) {
    Router._get('/login','admin/AuthController.login');
    Router._post('/login','admin/AuthController.postLogin');
});
Router._group('/admin',function (Router) {

   Router._get('/dashboard',[Middlewares('AdminMiddleware')],'admin/DashboardController.index');
   //======= blog tag routes ====//
   Router._get('/blog-tags',[Middlewares('AdminMiddleware')],'admin/BlogTagController.index');
   Router._get('/load-ajax-blog-tags',[Middlewares('AdminMiddleware')],'admin/BlogTagController.load_ajax_blog_tags');
   Router._get('/blog-tags/create',[Middlewares('AdminMiddleware')],'admin/BlogTagController.create');
   Router._post('/blog-tags/store',[Middlewares('AdminMiddleware')],'admin/BlogTagController.store');
   Router._get('/blog-tags/:id/edit',[Middlewares('AdminMiddleware')],'admin/BlogTagController.edit');
   Router._post('/blog-tags/:id/update',[Middlewares('AdminMiddleware')],'admin/BlogTagController.update');
   Router._delete('/blog-tags/:id/delete',[Middlewares('AdminMiddleware')],'admin/BlogTagController.destroy');
   //======= blog tag routes ====//
   

    //======= blog category routes ====//
    Router._get('/blog-categories',[Middlewares('AdminMiddleware')],'admin/BlogCategoryController.index');
    Router._get('/load-ajax-blog-categories',[Middlewares('AdminMiddleware')],'admin/BlogCategoryController.load_ajax_blog_categories');
    Router._get('/blog-categories/create',[Middlewares('AdminMiddleware')],'admin/BlogCategoryController.create');
    Router._post('/blog-categories/store',[Middlewares('AdminMiddleware')],'admin/BlogCategoryController.store');
    Router._get('/blog-categories/:id/edit',[Middlewares('AdminMiddleware')],'admin/BlogCategoryController.edit');
    Router._post('/blog-categories/:id/update',[Middlewares('AdminMiddleware')],'admin/BlogCategoryController.update');
    Router._delete('/blog-categories/:id/delete',[Middlewares('AdminMiddleware')],'admin/BlogCategoryController.destroy');
    //======= blog tag routes ====//

    //======= blog category routes ====//
    Router._get('/blogs',[Middlewares('AdminMiddleware')],'admin/BlogController.index');
    Router._get('/load-ajax-blogs',[Middlewares('AdminMiddleware')],'admin/BlogController.load_ajax_blogs');
    Router._get('/blogs/create',[Middlewares('AdminMiddleware')],'admin/BlogController.create');
    Router._post('/blogs/store',[Middlewares('AdminMiddleware')],'admin/BlogController.store');
    Router._get('/blogs/:id/edit',[Middlewares('AdminMiddleware')],'admin/BlogController.edit');
    Router._post('/blogs/:id/update',[Middlewares('AdminMiddleware')],'admin/BlogController.update');
    Router._delete('/blogs/:id/delete',[Middlewares('AdminMiddleware')],'admin/BlogController.destroy');
    //======= blog tag routes ====//


});
module.exports = Router;