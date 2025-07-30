require('dotenv').config();
const db = require('./src/config/db');
const express = require('express');
const cors = require('cors'); 
const app = express();

const nodemailer = require('nodemailer');
const projectRoutes = require('./src/routes/projectRoute');

app.use(cors()); 
app.use(express.json());

const productRoutes = require('./src/routes/product_routes');
app.use('/products', productRoutes);
app.use('/uploads', express.static('uploads'));


app.post('/api/contact', async (req, res) => {
  const { fullName, email, phone, service, projectDetails } = req.body;

  // Configure your SMTP transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or your email provider
    auth: {
      user: 'therath2426@gmail.com',
      pass: 'jnjh srhb xijk ppbg'
    }
  });

  const mailOptions = {
    from: email,
    to: 'therath2426@gmail.com', // where you want to receive the contact form emails
    subject: `New Contact Form Submission from ${fullName}`,
    text: `
Full Name: ${fullName}
Email: ${email}
Phone: ${phone}
Service: ${service}
Project Details: ${projectDetails}
    `
  };

  // ...inside your /api/contact route
try {
  await transporter.sendMail(mailOptions);
  res.status(200).json({ message: 'Email sent successfully' });
} catch (err) {
  console.error('Nodemailer error:', err); // <-- Add this line
  res.status(500).json({ message: 'Failed to send email', error: err });
}
});

app.use('/projects', projectRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
