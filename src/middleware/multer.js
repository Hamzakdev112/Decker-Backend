const express = require("express");
const cloudinary = require("cloudinary").v2;
const path = require("path");
const multer = require("multer");
cloudinary.config({
    cloud_name: 'divscx3hc',
    api_key: '521783356674715',
    api_secret: 'EqkZ38Ju18PMZyIWoqSvdf-1yR8',
});

const imageMiddleWare = () => {
  var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, "../../uploads"));
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "-" + Date.now());
    },
  });
  var upload = multer({ storage: storage });
  return upload;
};

const uploadToCloudinaryMiddleware = (req, res, next) => {
  const multerMiddleware =  imageMiddleWare();

  multerMiddleware.single('image') (req, res, (err) => {
    if (err) {
      console.error("Failed to upload image:", err);
      res.status(500).json({ error: "Failed to upload image" });
      return;
    }

    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        console.error("Failed to upload image to Cloudinary:", error);
        res.status(500).json({ error: "Failed to upload image to Cloudinary" });
        //console.log(result+ "a")
        return ;
      }
   
      req.imageURL = result.secure_url;
    
     const a = result.secure_url;
     //console.log(a);
     
     
    //console.log(a);
    
      next();
    });
    
  } 
  );
};

module.exports = uploadToCloudinaryMiddleware;

    destination: function (req, file, cb) {
      cb(null, '../../uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname))
    }
  })
  const upload = multer({ storage: storage}) */