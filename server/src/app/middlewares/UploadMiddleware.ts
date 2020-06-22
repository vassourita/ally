import crypto from 'crypto';
import multer from 'multer';
import { extname, resolve } from 'path';

export class UploadMiddleware {
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

  public single(name: string) {
    return multer({ storage: this.config }).single(name);
  }

  public array(name: string) {
    return multer({ storage: this.config }).array(name);
  }
}
