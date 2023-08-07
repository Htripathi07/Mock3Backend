const express = require("express");
const router = express.Router();
const Classified = require("../models/Classified");

// POST: Create a new classified
router.post("/create", async (req, res) => {
  try {
    const newClassified = new Classified(req.body);
    const savedClassified = await newClassified.save();
    res
      .status(201)
      .json({ message: "Classified created Successfully", savedClassified });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET: Fetch all classifieds
router.get("/", async (req, res) => {
  try {
    const classifieds = await Classified.find().sort({ postedAt: -1 });
    res.json(classifieds);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE: Delete a classified by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedClassified = await Classified.findByIdAndDelete(req.params.id);
    if (deletedClassified) {
      res.json({ message: "Classified deleted successfully" });
    } else {
      res.status(404).json({ error: "Classified not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//to filter ads
router.get("/", (req, res) => {
  const category = req.query.category;
  console.log(category);
  if (!category) {
    return res.status(400).json({ error: "Category parameter is required" });
  }

  Classified.find({ category: category }).toArray((err, results) => {
    if (err) {
      console.error("Error fetching classifieds:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching classifieds" });
    }
    res.json(results);
  });
});

router.get("/ads", (req, res) => {
  const name = req.query.name; 
  console.log(name);
  if (!name) {
    return res.status(400).json({ error: "name parameter is required" });
  }

  Classified.find({ name: name }).toArray((err, results) => {
    if (err) {
      console.error("Error fetching classifieds:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while fetching classifieds" });
    }
    res.json(results);
  });
});

router.get("/", (req, res) => {
  const sortBy = req.query.sort; 

  let sortQuery = {};
  if (sortBy === "date") {
    
    sortQuery = { postedDate: 1 };
  } else if (sortBy === "-date") {
  
    sortQuery = { postedDate: -1 };
  } else {
    
  }

  Classified.find()
    .sort(sortQuery)
    .toArray((err, results) => {
      if (err) {
        console.error("Error fetching classifieds:", err);
        return res
          .status(500)
          .json({ error: "An error occurred while fetching classifieds" });
      }
      res.json(results);
    });
});

module.exports = router;
