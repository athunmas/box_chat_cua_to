import express from "express";
import viewEngine from "./config/viewEngine";
import initWebEngine from "./routes/web";
import bodyParser from "body-parser";
require("dotenv").config();

let app = express();
viewEngine(app);

//parse request to json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

initWebEngine(app);


let port = process.env.PORT || 8080; 
app.listen(port, () =>
{
    console.log("chat box đang chạy ở cổng: " + port)
});
