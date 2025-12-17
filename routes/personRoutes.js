const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const MenuItem = require("../models/MenuItem");

//post route to Add person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body cintains the persons data

    //create new person document using mongoose model
    const newPerson = new Person(data);
    //save the person to the database
    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();

    console.log('data fetched')
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.send(400).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id; // extraxt id from url parameter
    const updatedUserData = req.body; //updated data for the user

    const response = await Person.findByIdAndUpdate(personId, updatedUserData, {
      new: true, //return the updated document
      runValidators: true, //run mongoose validation
    });

    if (!response) {
      return res.status(404).json({ error: "persom not found" });
    }

    console.log("data updated")
    res.status(200).json(response);

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "interna server error" });
  }
});

router.delete('/:id' , async(req,res)=>{
  try {
    const personId = req.params.id;
    const response = await Person.findByIdAndDelete(personId);

   if (!response) {
      return res.status(404).json({ error: "persom not found" });
    }

    console.log("user deleted")
    res.status(200).json({message :"user deleted "});
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "interna server error" });
  }
})

module.exports = router;
