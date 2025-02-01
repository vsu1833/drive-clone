const supabase = require('../config/supabase.config');

const uploadFile = async (file) => {
    const { data, error } = await supabase.storage
        .from('drive_files')
        .upload(`uploads/${Date.now()}_${file.name}`, file.data, {
            contentType: file.mimetype,
            upsert: true
        });

    if (error) throw error;
    return data;
};

module.exports = { uploadFile };