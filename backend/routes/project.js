const express = require('express');
const router = express.Router();
const Project = require('../models/Project.js');

router.post('/', async (req, res) => {

    const newProject = new Project({

        title: req.body.title,
        difficulty: req.body.difficulty,
        techStack: req.body.techStack,
        description: req.body.description,
        previewImage: req.body.previewImage,
        assetsLink: req.body.assetsLink

    });

    try{
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    }catch(error){
        res.status(400).json({ message: error.message });
    }
});

router.get('/', async (req,res) => {

    try{
        const projects = await Project.find();
        res.json(projects);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});

router.post('/:id', async (req, res) => {
    
});

// ... (කලින් තිබුන GET සහ POST කෝඩ් වලට පහලින් මේක ලියන්න)

// --- ROUTE 3: UPDATE A PROJECT (තියෙන එකක් වෙනස් කිරීම) ---
// URL: http://localhost:5000/api/projects/:id
router.put('/:id', async (req, res) => {
  try {
    // 1. ID එකෙන් හොයලා, අලුත් විස්තර (req.body) දාලා වෙනස් කරන්න
    // { new: true } කියන්නේ වෙනස් කරපු අලුත් ඩේටා එක ආපහු එවන්න කියන එකයි
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true }
    );

    // 2. හරියට වුනාද බලනවා
    if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// --- ROUTE 4: DELETE A PROJECT (තියෙන එකක් මැකීම) ---
// URL: http://localhost:5000/api/projects/:id
router.delete('/:id', async (req, res) => {
  try {
    // 1. ID එකෙන් හොයලා මකලා දාන්න
    const deletedProject = await Project.findByIdAndDelete(req.params.id);

    // 2. හරියට වුනාද බලනවා
    if (!deletedProject) {
        return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

