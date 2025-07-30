const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const upload = require('../middleware/uploads');

// Accept multiple images and a main image
router.post(
  '/',
  upload.fields([
    { name: 'images', maxCount: 5 },
    { name: 'mainImage', maxCount: 1 }
  ]),
  projectController.addProject
);
router.get('/', projectController.getAllProjects);

module.exports = router;