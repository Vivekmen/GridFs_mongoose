const mongoose=require('mongoose');


module.exports=function Databaseconnect(){mongoose.connect("mongodb://localhost:27017/Gridfs")
         .then(()=>console.log("Data base Connected"))
         .catch((err)=>console.log("Mongo error",err));
}