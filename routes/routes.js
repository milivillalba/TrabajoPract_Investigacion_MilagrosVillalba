//impor

const express = require("express");
const router = express.Router();
const {
  getAllImages,
  uploadImage,
  deleteImage,
} = require("../controllers/img.controllers");

// Ruta para mostrar todas las imágenes
router.get("/", async (req, res) => {
  try {
    await getAllImages(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener las imágenes");
  }
});

// Ruta para subir una imagen
router.post("/upload", async (req, res) => {
  try {
    await uploadImage(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la subida y almacenamiento de la imagen.");
  }
});

// Ruta para eliminar una imagen
router.post("/delete/:id", async (req, res) => {
  try {
    await deleteImage(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error en la eliminación de la imagen.");
  }
});

module.exports = router;

// const express = require("express");
// const router = express.Router();
// const {
//   getAllImages,
//   uploadImage,
//   deleteImage,
// } = require("../controllers/img.controllers");
// const cloudinary = require("../services/cloudinary");

// // Ruta para mostrar todas las imágenes
// router.get("/", getAllImages);

// // Ruta para subir una imagen
// router.post("/upload", uploadImage);

// // Ruta para eliminar una imagen
// router.post("/delete/:id", deleteImage);

// //rutas para mostrar todas las imagenes
// router.get("/", (req, res) => {
//   db.query("SELECT * FROM imagnes", (err, results) => {
//     if (err) throw err;
//     res.render("index", { images: results });
//   });
// });

// // Ruta para subir una imagen
// router.post("/upload", (req, res) => {
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send("No se ha subido ningún archivo.");
//   }

//   const imageFile = req.files.image;
//   const imageDescription = req.body.description;

//   cloudinary.uploader.upload(imageFile.tempFilePath, (err, result) => {
//     if (err) throw err;

//     const imageUrl = result.secure_url;

//     db.query(
//       "INSERT INTO images (url, description) VALUES (?, ?)",
//       [imageUrl, imageDescription],
//       (err) => {
//         if (err) throw err;
//         res.redirect("/");
//       }
//     );
//   });
// });

// // Ruta para eliminar una imagen
// router.post("/delete/:id", (req, res) => {
//   const imageId = req.params.id;

//   db.query("SELECT url FROM images WHERE id = ?", [imageId], (err, results) => {
//     if (err) throw err;

//     const imageUrl = results[0].url;

//     // Eliminar imagen de Cloudinary
//     cloudinary.uploader.destroy(imageUrl, (err, result) => {
//       if (err) throw err;

//       // Eliminar registro de la base de datos
//       db.query("DELETE FROM images WHERE id = ?", [imageId], (err) => {
//         if (err) throw err;
//         res.redirect("/");
//       });
//     });
//   });
// });
// module.exports = router;
