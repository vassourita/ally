import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

export default class UploadMiddleware {
  private get config() {
    return multer.diskStorage({
      destination: resolve(__dirname, '..', '..', '..', 'public', 'uploads'),
      filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, bytes) => {
          if (err) return cb(err, '');
          return cb(null, bytes.toString('hex') + extname(file.originalname));
        });
      },
    });
  }

  private single(name: string) {
    return multer({ storage: this.config }).single(name);
  }

  private array(name: string) {
    return multer({ storage: this.config }).array(name);
  }
}
