const express=require('express')
const bodyParser=require('body-parser')
const app=express();
const cookieParser = require('cookie-parser');
const { error } = require('console');
const db= require('../model/index')
const Book=db.books;
app.use(express.json())

app.use(express.urlencoded({urlencoded: true}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const expressFileUpload = require('express-fileupload');
const fs = require('fs');
const fastCSV = require('@fast-csv/parse');

app.use(expressFileUpload());


// const uploadss= async (req, res) => {
//     console.log(req.files.file)
//     file = req.files.file;
//   if (!file ) {
//     return res.status(400).send('No files were uploaded.');
//   }


//   const fileUploadPath = __dirname + '/csvFiles/'+ file.name;

//   const uploadedFileReadStream = fs.createReadStream(fileUploadPath);
//   const csvRows = [];

// uploadedFileReadStream
// .pipe(fastCSV.parse({ headers: true, ignoreEmpty: true, strictColumnHandling: true, objectMode:false, trim: true, rtrim:true, ltrim:true, discardUnmappedColumns:true}))
// .on('error', error => console.error(error))
// .setEncoding('utf-8')
// .on('data', row => csvRows.push(row))
// // .on('end', (rowCount) => res.status(200).json({message:'save',csvRows, rowCount}))
// .on("end", () => {
//     Book.bulkCreate(csvRows)
//       .then(() => {
//         res.status(200).json({message:'save',csvRows})
//       })
//       .catch((error) => {
//         res.status(500).send({
//           message: "Fail to import data into database!",
//           error: error.message,
//         });
//       });
// });
// }
// module.exports={uploadss};

