const express = require('express')
const next = require('next')
const multer = require('multer')
//const cloudinary = require('cloudinary')
const bodyParser = require('body-parser')
const fileUploadMiddleware = require('./file-upload-middleware')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
//path is required for uploading files
const path = require('path');

app.prepare()
  .then(() => {
    const server = express()
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())

    //config requied to use file folder to upload files
    server.use('/files', express.static(path.join(__dirname, '/files')));
    /*cloudinary.config({
      cloud_name: 'xxxxxx',
      api_key: 'xxxxxxx',
      api_secret: 'xxxxxxx',
    })*/

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        debugger;
        cb(null, 'files');
      },
      filename: (req, file, cb) =>{
        debugger;
        cb(null, file.originalname)
      }
    });
   const upload = multer({ storage })


    server.post('/files', upload.single('file'), 
      //fileUploadMiddleware
      (req, res) =>{
        res.statusCode =  200;
        res.setHeader("Content-Type", "application/json");
        res.json(req.file);
      }
    )

    server.post('/api/changeProfilePicture', (req, res) => {
      console.log('/api/changeProfilePicture')
      console.log(req.body)
      // you can do whatever you want with this data
      // change profile pic, save to DB, or send it to another API 
      res.end()
    })

    server.get('*', (req, res) => {
      debugger;
      return handle(req, res)
    })

    server.listen(port, (err) => {
      debugger;
      if (err) throw err
      console.log(`> Ready on http://localhost:${port}`)
    })
  })