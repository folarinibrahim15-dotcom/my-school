// import multer from "multer";

// /*
// |--------------------------------------------------------------------------
// | Memory Storage
// |--------------------------------------------------------------------------
// */

// const storage = multer.memoryStorage();

// /*
// |--------------------------------------------------------------------------
// | Allowed File Types
// |--------------------------------------------------------------------------
// */

// const fileFilter = (req, file, cb) => {

//   const allowedTypes = [
//     "image/jpeg",
//     "image/jpg",
//     "image/png",
//     "image/webp",
//     "application/pdf",
//   ];

//   if (allowedTypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(
//       new Error(
//         "Only JPG, JPEG, PNG, WEBP and PDF files are allowed."
//       ),
//       false
//     );
//   }
// };

// /*
// |--------------------------------------------------------------------------
// | Upload Configuration
// |--------------------------------------------------------------------------
// */

// const upload = multer({
//   storage,

//   fileFilter,

//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

// export default upload;

import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    return cb(null, true);
  }

  return cb(
    new Error("Passport must be a JPG, PNG, or WebP image."),
    false
  );
};

const passportUpload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
});

export default passportUpload;