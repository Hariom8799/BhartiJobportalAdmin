import mongoose from "mongoose";

const AboutUsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    editor: { type: String, required: true }, // HTML content
    images: [String], // array of image URLs
    status: { type: String, enum: ["active", "inactive"], default: "inactive" },
  },
  { timestamps: true }
);

const AboutUs =
  mongoose.models.AboutUs || mongoose.model("AboutUs", AboutUsSchema);

export default AboutUs;
