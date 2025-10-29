const Note = require("../models/Note");

// @desc Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to get notes", error: err.message });
  }
};

// @desc Get a single notes
exports.getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Failed to get note", error: err.message });
  }
};

// @desc Create a note
exports.createNote = async (req, res) => {
  try {
    // Use req.body (not res.body)
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create note", error: err.message });
  }
};

// @desc Update a note
exports.updateNote = async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(note);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update note", error: err.message });
  }
};

// @desc Delete a note
exports.deleteNote = async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete note", error: err.message });
  }
};
