const cloudinary = require("cloudinary").v2;
const Image = require("../models/imagen.model");

const imageController = {
  getAllImages: async (req, res) => {
    try {
      const images = await Image.findAll();
      res.render("index", { images });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error al obtener las imágenes");
    }
  },

  uploadImage: async (req, res) => {
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No se ha subido ningún archivo.");
      }

      const imageFile = req.files.image;
      const imageDescription = req.body.description;

      const result = await cloudinary.uploader.upload(imageFile.tempFilePath);
      const imageUrl = result.secure_url;

      await Image.create({ url: imageUrl, description: imageDescription });

      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en la subida y almacenamiento de la imagen.");
    }
  },

  deleteImage: async (req, res) => {
    try {
      const imageId = req.params.id;
      const image = await Image.findByPk(imageId);

      if (!image) {
        return res.status(404).send("Imagen no encontrada");
      }

      const cloudinaryResult = await cloudinary.uploader.destroy(image.url);

      if (cloudinaryResult.result !== "ok") {
        console.error(cloudinaryResult.error);
        return res
          .status(500)
          .send("Error al eliminar la imagen de Cloudinary");
      }

      await image.destroy();

      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error en la eliminación de la imagen.");
    }
  },
};

module.exports = imageController;

// const Image = require("../models/imagen.model"); // Importa el modelo de imagen
// const cloudinary = require("../services/cloudinary");

// const imageController = {
//   // Obtener todas las imágenes y mostrarlas en la vista
//   getAllImages: (req, res) => {
//     Image.findAll()
//       .then((images) => {
//         res.render("index", { images });
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send("Error al obtener las imágenes");
//       });
//   },

//   // Subir una nueva imagen y guardar su URL en la base de datos
//   uploadImage: (req, res) => {
//     if (!req.files || Object.keys(req.files).length === 0) {
//       return res.status(400).send("No se ha subido ningún archivo.");
//     }

//     const imageFile = req.files.image;
//     const imageDescription = req.body.description;

//     cloudinary.uploader.upload(imageFile.tempFilePath, (err, result) => {
//       if (err) {
//         console.error(err);
//         return res.status(500).send("Error al subir la imagen a Cloudinary");
//       }

//       const imageUrl = result.secure_url;

//       Image.create({ url: imageUrl, description: imageDescription })
//         .then(() => {
//           res.redirect("/");
//         })
//         .catch((error) => {
//           console.error(error);
//           res
//             .status(500)
//             .send("Error al guardar la imagen en la base de datos");
//         });
//     });
//   },

//   // Eliminar una imagen por su ID
//   deleteImage: (req, res) => {
//     const imageId = req.params.id;

//     Image.findByPk(imageId)
//       .then((image) => {
//         if (!image) {
//           return res.status(404).send("Imagen no encontrada");
//         }

//         cloudinary.uploader.destroy(image.url, (err, result) => {
//           if (err) {
//             console.error(err);
//             return res
//               .status(500)
//               .send("Error al eliminar la imagen de Cloudinary");
//           }

//           image
//             .destroy()
//             .then(() => {
//               res.redirect("/");
//             })
//             .catch((error) => {
//               console.error(error);
//               res
//                 .status(500)
//                 .send("Error al eliminar la imagen de la base de datos");
//             });
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//         res.status(500).send("Error al buscar la imagen en la base de datos");
//       });
//   },
// };

// module.exports = imageController;
