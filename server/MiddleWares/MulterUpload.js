import multer from 'multer';


const ALLOWED_FORMATS = ['image/*'];
const storage  = multer.memoryStorage();

const multerUpload = multer({ 
  storage : storage,
  fileFilter: function (req, file, cb) {
      //console.log("Multer => ",file,file.mimetype)
      if (file.mimetype.startsWith('image/')) {
          cb(null, true); // Allow the upload
        } else {
          cb(new Error('Only image files are allowed!'), false); // Reject the upload 
        }
    },
});

export default multerUpload;