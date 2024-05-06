import { Injectable } from '@nestjs/common';
import { join } from 'path';
import * as sharp from 'sharp';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class StorageService {
    constructor(private readonly firebaseService: FirebaseService) {}

    async saveImage(image: string, id: string, type: 'raw' | 'edited'): Promise<void> {
        await this.firebaseService.saveImage64(image, id, type);
    }

    async getImage(id: string, type: 'raw' | 'edited', framed: boolean): Promise<string> {
      const image64 = await this.firebaseService.getImage64(id, type);
      if (framed) {
        // Load images
        const image_buf = Buffer.from(image64, 'base64');
        const frame_path = join(__dirname, '../assets/sw-frame.png');
        const frame_logo_path = join(__dirname, '../assets/frame_logo.png');
        const frame = sharp(frame_path);
        const frame_logo = await sharp(frame_logo_path).toBuffer();

        // Compose
        const result_buf = await frame.composite([
          { input: image_buf, top: 30, left: 28},
          { input: frame_logo }
        ]).toBuffer();

        // Return final image as base64
        return result_buf.toString('base64');
      } else {
        return image64;
      }
    }
}
