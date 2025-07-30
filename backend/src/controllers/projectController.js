// filepath: e:\glassCeentre\Backend\backend\src\controllers\project_controller.js
const db = require('../config/db');

exports.addProject = async (req, res) => {
  try {
    const {
      title, category, location, client, year,
      description, challenge, solution
    } = req.body;

    // Parse keyFeatures if sent as JSON string
    let keyFeatures = [];
    if (req.body.keyFeatures) {
      try {
        keyFeatures = JSON.parse(req.body.keyFeatures);
      } catch {
        keyFeatures = [];
      }
    }

    // Handle images
    let images = [];
    let mainImage = '';
    if (req.files) {
      if (req.files.images) {
        images = req.files.images.map(file => `${req.protocol}://${req.get('host')}/uploads/${file.filename}`);
      }
      if (req.files.mainImage && req.files.mainImage[0]) {
        mainImage = `${req.protocol}://${req.get('host')}/uploads/${req.files.mainImage[0].filename}`;
      }
    }

    const projectData = {
      title,
      category,
      location,
      client,
      year,
      description,
      challenge,
      solution,
      keyFeatures,
      images,
      mainImage
    };

    const docRef = await db.collection('projects').add(projectData);
    res.status(201).json({ success: true, id: docRef.id, project: projectData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


exports.getAllProjects = async (req, res) => {
  try {
    const snapshot = await db.collection('projects').get();
    const projects = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};