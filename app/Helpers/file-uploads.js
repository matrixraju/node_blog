
const path = require('path');

const multer=require('multer');


const fileUploads = {

    //================================================
    categoryImage: function (req,res,next) {
       
      
        const fileStorage =  multer.diskStorage({ destination: (req, file, cb) => {
            console.log(file);
            if (file.fieldname === "image") { 
                cb(null, publicPath+'/blog_category_images')
            } 
        },
        filename: (req, file, cb) => { // naming file
            cb(null, file.fieldname+"-"+Date.now()+path.extname(file.originalname));
        }
        });

        const fileFilter = (req, file, cb) => {
            if (
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg'
            ) { // check file type to be png, jpeg, or jpg
                cb(null, true);
            } else {
                cb(null, false); // else fails
            }
        };

        const upload = multer(
            { 
            storage: fileStorage, 
            limits:
                { 
                fileSize:'2mb' 
                }, 
            fileFilter: fileFilter 
            }
        ).fields(
            [
            { 
                name: 'image', 
                maxCount: 1 
            }
            ]
        );

        return upload;
    }
    //================================================

};

module.exports = fileUploads;