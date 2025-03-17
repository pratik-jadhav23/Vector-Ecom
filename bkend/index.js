let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");
const route = require("./routes/userroutes");
let bodyParser = require("body-parser");
mongoose.connect("mongodb://127.0.0.1:27017/hfs1ecomdb").then(() => {
  console.log("ok");
});
const port = 5001
let app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/pimgs", express.static("./prodimgs"));
app.use("/", route);
// app.listen(5001);
app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
