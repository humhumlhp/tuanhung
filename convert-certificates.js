// PDF to Image Converter Script
// Run with: node convert-certificates.js

const fs = require('fs');
const path = require('path');

// This script requires pdf-poppler package
// Install with: npm install pdf-poppler

const pdf2pic = require('pdf-poppler');

const options = {
    format: 'jpeg',
    out_dir: './Assets/certi',
    out_prefix: 'converted',
    page: null, // Convert all pages, set to 1 for first page only
    quality: 100 // High quality
};

async function convertPDFs() {
    const certiDir = './Assets/certi';
    const files = fs.readdirSync(certiDir);
    
    for (const file of files) {
        if (file.endsWith('.pdf')) {
            const pdfPath = path.join(certiDir, file);
            console.log(`Converting ${file}...`);
            
            try {
                const convert = await pdf2pic.convert(pdfPath, options);
                
                // Rename the converted file to match our HTML expectations
                const baseName = file.replace('.pdf', '');
                if (baseName.includes('CCA')) {
                    fs.renameSync(
                        path.join(certiDir, 'converted.1.jpeg'),
                        path.join(certiDir, 'cca-traditional-graduation.jpg')
                    );
                } else if (baseName.includes('Robotraffic')) {
                    fs.renameSync(
                        path.join(certiDir, 'converted.1.jpeg'),
                        path.join(certiDir, 'robotraffic-3rd-place.jpg')
                    );
                }
                
                console.log(`✓ Converted ${file}`);
            } catch (error) {
                console.error(`✗ Error converting ${file}:`, error.message);
            }
        }
    }
}

// Check if pdf-poppler is installed
try {
    require.resolve('pdf-poppler');
    convertPDFs().then(() => {
        console.log('🎉 All certificates converted!');
    });
} catch (e) {
    console.log('📦 Installing pdf-poppler...');
    console.log('Run these commands:');
    console.log('1. npm init -y');
    console.log('2. npm install pdf-poppler');
    console.log('3. node convert-certificates.js');
}
