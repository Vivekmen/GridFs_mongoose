const express=require('express')
const multer = require("multer");
const mongoose = require("mongoose");
const { GridFsStorage } = require("multer-gridfs-storage");
const app = express();
const dbConnect= require("./utils/database");

app.use(express.json())

const storage = new GridFsStorage({
    url: "mongodb://localhost:27017/Gridfs",
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            const filename = file.originalname;
            console.log(filename);
            const fileInfo = {
                filename: filename,
                bucketName: "filebuckets",
            };
            resolve(fileInfo);
        });
    },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file1"), (req, res) => {
    res.send("File uploaded successfully");
});

app.get("/file/:filename", (req, res) => {
    const filename = req.params.filename;
    const bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "filebuckets",
    });
    // console.log(bucket);
    const downloadStream = bucket.openDownloadStreamByName(filename);
    // console.log(downloadStream);
    (downloadStream.pipe(res));
});

app.listen(3000, () => {
  console.log(`Server is listening on port ......`);
});

dbConnect();  