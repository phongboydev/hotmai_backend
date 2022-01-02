// upload-file
const multer = require('multer');
const uploadImage = () => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './public/images/avatars')
        },
        filename: function(req, file, cb) {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, Date.now() + "_" + file.originalname)
        },
    })
    const upload = multer({
        storage: storage,
        fileFilter: function fileFilter(req, file, cb) {
            const extensionImageList = [".png", ".jpg"];
            const extension = file.originalname.slice(-4);
            const check = extensionImageList.includes(extension);
            if (check) {
                // To accept the file pass `true`, like so:
                cb(null, true)
            } else {
                // You can always pass an error if something goes wrong:
                cb(new Error('I don\'t have a clue!'))
            }
        }
    });
    return upload.single("avatar");
}

module.exports = {
    uploadImage
}