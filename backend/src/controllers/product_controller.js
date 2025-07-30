const db = require('../config/db');

exports.addProduct = async (req, res) => {
  try {
    const productData = req.body;

    // If an image was uploaded, add its URL to productData
    if (req.file) {
      productData.imageUrl = `/uploads/${req.file.filename}`;
    }

    // Parse JSON fields if needed (for arrays/objects sent as strings)
    if (productData.specifications) {
      productData.specifications = JSON.parse(productData.specifications);
    }
    if (productData.features) {
      productData.features = JSON.parse(productData.features);
    }
    if (productData.applications) {
      productData.applications = JSON.parse(productData.applications);
    }
    if (productData.technicalData) {
      productData.technicalData = JSON.parse(productData.technicalData);
    }

    const docRef = await db.collection('products').add(productData);
    res.status(201).json({ success: true, id: docRef.id, imageUrl: productData.imageUrl });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }

};


  exports.getAllProducts = async (req, res) => {
  try {
    const snapshot = await db.collection('products').get();
    const products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
