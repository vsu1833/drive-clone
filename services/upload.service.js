const supabase = require("../config/supabase.config");
const uploadFile = async (file) => {
  try {
    const { data, error } = await supabase.storage
      .from("drive_files")
      .upload(`uploads/${Date.now()}_${file.name}`, file.data, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) {
      console.error("Supabase upload error:", error);
      throw error;
    }
    return data;
  } catch (error) {
    console.error("Upload service error:", error);
    throw error;
  }
};
module.exports = { uploadFile };
