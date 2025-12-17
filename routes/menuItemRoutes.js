const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);
    const response = await newMenu.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();

    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/taste/:taste", async (req, res) => {     //finf items according to the taste
  try {
    const taste = req.params.taste;

    const response = await MenuItem.find({ taste: taste });
    res.status(200).json({
      taste : taste,
      totalItems : response.length,
      items : response
    });
  } catch (error) {
    console,log(error);
    res.status(500).json({error:"internal server erroe"})
  }
});

router.put("/:id", async (req, res) => {
  try {
    const menuId = req.params.id; // extract id from url parameter
    const updatedMenuItem = req.body; //updated data for the user

    const response = await MenuItem.findByIdAndUpdate(menuId, updatedMenuItem, {
      new: true, //return the updated document
      runValidators: true, //run mongoose validation
    });

    if (!response) {
      return res.status(404).json({ error: "menu item not found" });
    }

    console.log("data updated")
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});


router.delete('/:id' , async(req,res)=>{
  try {
    const menuId = req.params.id;

    const response = await MenuItem.findByIdAndDelete(menuId);

    if(!response){
      res.status(404).json({error:"meninitem not found"});
    }

    console.log("item deleted");
    res.status(200).json({message:"item deleted from menu"});
  } catch (error) {
    console.log(error);
    res.status(500).json({error:"internal srver error"});
  }
})

//comment added for testing
module.exports = router;
 