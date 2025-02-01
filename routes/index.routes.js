const express = require('express');
const router = express.Router();
const { uploadFile } = require('../services/upload.service');
const fileUpload = require('express-fileupload');

// Add file upload middleware
router.use(fileUpload());


router.get('/home', (req, res) => {
    res.render('home');
    
    });


router.post('/upload', async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).send('No file uploaded');
        }

        const result = await uploadFile(req.files.file);
        res.json({
            message: 'File uploaded successfully',
            path: result.Key
        });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).send('Error uploading file');
    }
});

module.exports = router;