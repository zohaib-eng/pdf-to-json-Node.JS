const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express();
const cookieParser = require('cookie-parser');
const db= require('./model/index')
// const initRoutes= require('./routes/book.routes')
app.use(express.json())

app.use(express.urlencoded({urlencoded: true}))
// initRoutes(app)
app.use(cookieParser());
const expressFileUpload = require('express-fileupload');
app.use(expressFileUpload());
const fs = require('fs');
const fastCSV = require('@fast-csv/parse');
const Book=db.books;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.options("*", cors());
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`app listening at http://0.0.0.0:${PORT}.`);
});

db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
});

app.post('/csvParse', async(req, res) => {
  file = req.files.file;
if (!file ) {
  return res.status(400).send('No files were uploaded.');
}


const fileUploadPath = __dirname + '/csvFiles/'+ file.name;

const uploadedFileReadStream = fs.createReadStream(fileUploadPath);
const csvRows = [];

uploadedFileReadStream
.pipe(fastCSV.parse({ headers: true, ignoreEmpty: true, strictColumnHandling: true, objectMode:false, trim: true, rtrim:true, ltrim:true, discardUnmappedColumns:true}))
.on('error', error => console.error(error))
.setEncoding('utf-8')
.on('data', row => csvRows.push(JSON.parse(row)))
// .on('end', (rowCount) => res.status(200).json({message:'save',csvRows, rowCount}))
.on("end", () => {
  console.log(csvRows);
  Book.bulkCreate(csvRows)
    .then(() => {
      res.status(200).json({message:'save',csvRows})
    })
    .catch((error) => {
      res.status(500).send({
        message: "Fail to import data into database!",
        error: error.message,
      });
    });
}); 
})



module.exports=app;

