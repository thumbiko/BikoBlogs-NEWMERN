const router = require("express").Router();
const Category = require("../models/Category");


//create
router.post("/", async (req,res) => {
    const newCat = new Category(req.body);
    console.log("cat", newCat)
    try {
        const savedCat = await newCat.save();
        res.status(200).json(savedCat);
    } catch (err) {
        console.log("hereejhbcdsb")
        res.status(500).json(err)
    }
});


//get
router.get("/", async (req,res) => {
    try {
        const cats = await Category.find();
        res.status(200).json(cats);
    } catch (err) {
        res.status(500).json(err)
    }
});


module.exports = router