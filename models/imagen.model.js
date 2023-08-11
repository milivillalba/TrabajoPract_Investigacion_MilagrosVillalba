const { DataTypes, sequelize } = require("../db"); // Importa la configuración de la base de datos

const Image = sequelize.define(
  "Image",
  {
    Nombre_archivo: DataTypes.STRING,
    formato_archivo: DataTypes.STRING,
    tipo_imagen: DataTypes.STRING,
    url: DataTypes.TEXT,
    url_segura: DataTypes.TEXT,
    asset_id: DataTypes.STRING,
    public_id: DataTypes.STRING,
    version_id: DataTypes.STRING,
    creacion: DataTypes.DATE,
  },
  {
    sequelize,
    paranoid: true,
    modelName: "Image",
    tableName: "images",
    underscored: true,
  }
);

console.log("Image");
Image.sync();

module.exports = Image;

// const { DataTypes, sequelize } = require("../db"); // Importa la configuración de la base de datos

// const Image = sequelize.define(
//   "Image",
//   {
//     Nombre_archivo: DataTypes.STRING,
//     formato_archivo: DataTypes.STRING,
//     tipo_imagen: DataTypes.STRING,
//     url: DataTypes.TEXT,
//     url_segura: DataTypes.TEXT,
//     asset_id: DataTypes.STRING,
//     public_id: DataTypes.STRING,
//     version_id: DataTypes.STRING,
//     creacion: DataTypes.DATE,
//   },
//   {
//     sequelize,
//     paranoid: true,
//     modelName: "Image",
//     tableName: "images",
//     underscored: true,
//   }
// );

// console.log("Image");
// Image.sync();

// module.exports = Image;
