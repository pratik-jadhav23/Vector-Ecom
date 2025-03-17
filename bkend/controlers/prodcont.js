let multer = require("multer");
let { v4 } = require("uuid");
let pm = require("../models/prodmodel");
let fs = require("fs");
const cm = require("../models/cartmodel");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./prodimgs");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + "." + file.mimetype.split("/")[1]
    );
  },
});

const upload = multer({ storage: storage });

let add = async (req, res) => {
  try {
    let data = new pm({ ...req.body, pimg: req.file.filename, _id: v4() });
    await data.save();
    res.json({ msg: "prod added" });
  } catch (err) {
    res.json({ msg: "error in adding prod" });
  }
};
let getprod = async (req, res) => {
  try {
    let data = await pm.find();
    res.json(data);
  } catch (err) {
    res.json({ msg: "error in fetching products" });
  }
};
let addcom = async (req, res) => {
  try {
    let obj = { ...req.body };
    delete obj["_id"];
    await pm.findByIdAndUpdate({ _id: req.body._id }, { $push: { comm: obj } });
    let data = await pm.findById({ _id: req.body._id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.json({ msg: "error in adding comm" });
  }
};
let edit = async (req, res) => {
  try {
    await pm.findByIdAndUpdate({ _id: req.body._id }, req.body);
    let data = { ...req.body };
    delete data["_id"];
    delete data["desc"];
    await cm.updateMany({ pid: req.body._id }, data);
    res.json({ msg: "upd done" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "error in edit prod" });
  }
};
let editimg = async (req, res) => {
  try {
    await pm.findByIdAndUpdate(
      { _id: req.body._id },
      { pimg: req.file.filename }
    );
    fs.rm(`./prodimgs/${req.body.oldimg}`, () => {});
    await cm.updateMany({ pid: req.body._id }, { pimg: req.file.filename });
    res.json({ msg: "upd done" });
  } catch (err) {
    console.log(err);
    res.json({ msg: "error in edit prod" });
  }
};
let delprod=async(req,res)=>{
  try{
    let obj=await pm.findByIdAndDelete({"_id":req.params.pid})
    console.log(obj)
    fs.rm(`./prodimgs/${obj.pimg}`, () => {});
   await cm.deleteMany({"pid":req.params.pid})
    res.json({"msg":"deldone"})

  }
  catch(err)
  {
    res.json({"msg":"error in del"})
  }
}
module.exports = { add, getprod, upload, addcom, edit, editimg,delprod };
