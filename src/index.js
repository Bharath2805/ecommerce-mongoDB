import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";
/* write iffe style code with async */ 

(async()=>{
    try {
         mongoose.connect(config.MONGODB_URL)
    
         app.on('error',(err) => {
            console.error("ERROR:",err)
            throw err
         })

         const OnListening = () => {
            console.log(`LISTENING ON PORT {config.PORT}`);
         }
         app.listen(config.PORT,OnListening)

        
    } catch (err) {
        console.error("ERROR :",err)
        throw err
    }
})()