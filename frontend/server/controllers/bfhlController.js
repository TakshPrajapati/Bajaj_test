import { isValidBase64, getFileMetadata } from '../utils/fileUtils.js';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const bfhlController = {
  postData: async (req, res) => {
    try {
      const { data = [], file_b64 } = req.body;

      // User data
      const full_name = 'john_doe';
      const dob = '17091999';
      const user_id = `${full_name}_${dob}`;
      const email = 'john@xyz.com';
      const roll_number = 'ABCD123';

      const numbers = data.filter(item => !isNaN(item));
      const alphabets = data.filter(item => /^[a-zA-Z]$/.test(item));
      const lowercaseAlphabets = alphabets.filter(item => item === item.toLowerCase());
      const highest_lowercase_alphabet = lowercaseAlphabets.length > 0 ? [lowercaseAlphabets.pop()] : [];

      // File handling
      let file_valid = false, file_mime_type = '', file_size_kb = '';
      if (file_b64) {
        file_valid = isValidBase64(file_b64);
        if (file_valid) {
          const fileInfo = await getFileMetadata(file_b64);
          file_mime_type = fileInfo.mime;
          file_size_kb = fileInfo.size_kb;

          const filename = `${uuidv4()}.png`;
          const filePath = path.join(__dirname, '../uploads', filename);
          await fs.writeFile(filePath, Buffer.from(file_b64, 'base64'));
        }
      }

      // Response
      res.json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        file_valid,
        file_mime_type,
        file_size_kb,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ is_success: false, error: 'Server error' });
    }
  },

  getOperationCode: (req, res) => {
    res.json({ operation_code: 1 });
  },
};

export default bfhlController;
