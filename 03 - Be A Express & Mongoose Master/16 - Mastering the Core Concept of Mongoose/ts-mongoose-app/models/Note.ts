import mongoose = require("mongoose");

export interface INote extends Document {
  title: string;
  content: string;
  isPinned: boolean;
  createdAt: Date;
}

const noteSchema = new mongoose.Schema<INote>({
  title: {
    type: String,
    required: [true, "Title is required."],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "content is required."],
  },
  isPinned: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Note = mongoose.model<INote>("Note", noteSchema);
