import userModel from '../models/userModel.js';
import FormData from 'form-data';
import axios from 'axios';
import jwt from 'jsonwebtoken';

export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const token = req.headers.token;

    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    // ✅ Decode user from token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.json({ success: false, message: "Invalid token" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user || !prompt) {
      return res.json({ success: false, message: "Missing Details" });
    }

    // ✅ Check credits properly
    if (user.creditBalance <= 0) {
      return res.json({
        success: false,
        message: "No credit Balance",
        creditBalance: user.creditBalance,
      });
    }

    // ✅ Call Clipdrop API
    const formData = new FormData();
    formData.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formData,
      {
        headers: {
          "x-api-key": process.env.CLIPDROP_API,
        },
        responseType: "arraybuffer",
      }
    );

    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    // ✅ Deduct credits
    await userModel.findByIdAndUpdate(user._id, {
      creditBalance: user.creditBalance - 1,
    });

    res.json({
      success: true,
      message: "Image Generated",
      creditBalance: user.creditBalance - 1,
      resultImage,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
