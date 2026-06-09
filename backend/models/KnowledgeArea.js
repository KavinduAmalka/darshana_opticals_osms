const mongoose = require('mongoose');

const knowledgeAreaSchema = new mongoose.Schema(
  {
    Category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    Content_Title: {
      type: String,
      required: [true, 'Content title is required'],
      trim: true,
    },
    Content_Body: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('KnowledgeArea', knowledgeAreaSchema);
