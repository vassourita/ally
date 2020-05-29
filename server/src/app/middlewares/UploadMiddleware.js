import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default class UploadMiddleware {
  static get config() {
    return multer.diskStorage({
      destination: resolve(__dirname, '..', '..', '..', 'public', 'uploads'),
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, bytes) => {
          if (err) return cb(err);
          return cb(null, bytes.toString('hex') + extname(file.originalname));
        });
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    });
  }

  static single(name) {
    return multer({ storage: this.config }).single(name);
  }

  static array(name) {
    return multer({ storage: this.config }).array(name);
  }
}
