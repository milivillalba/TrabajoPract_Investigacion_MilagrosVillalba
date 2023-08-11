const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "ddaavzzcb",
  api_key: "147952543786326",
  api_secret: "***************************",
});

module.exports = cloudinary;
