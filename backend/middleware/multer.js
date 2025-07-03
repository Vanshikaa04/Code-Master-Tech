//for managing file uploads

import multer from "multer";
// Multer Configuration
const storage = multer.diskStorage({
    filename: (req, file, callback) => {
        callback(null, file.originalname); // Files will be stored in `uploads/`
    },

});
const upload =multer({storage})

export default upload