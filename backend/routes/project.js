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

module.exports = router;
