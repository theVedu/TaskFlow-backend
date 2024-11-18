const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const cloudinary = require('../config/cloudinary'); // Import cloudinary

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
  },
  screenshotUrl: {
    type: DataTypes.STRING, // This will store the Cloudinary URL
  },
  link: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
  color: {
    type: 
  },
  lastUpdated: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Hook to upload screenshot to Cloudinary before creating the note
Note.beforeCreate(async (note) => {
  if (note.screenshotUrl) {
    try {
      const uploadResponse = await cloudinary.uploader.upload(note.screenshotUrl, {
        folder: 'notes/screenshots',
        use_filename: true,
        unique_filename: false,
      });
      note.screenshotUrl = uploadResponse.secure_url; // Store the URL of the uploaded image
    } catch (err) {
      throw new Error('Error uploading screenshot to Cloudinary');
    }
  }
});

module.exports = Note;
