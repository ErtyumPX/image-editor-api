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
        // resize file to be 1024x1024
        const resizedImageBuffer = await sharp(image_buf).resize(1048, 1048, {
          fit: 'cover'
        }).toBuffer();
        const frame_path = join(__dirname, '../assets/sw-frame.png');
        const frame_logo_path = join(__dirname, '../assets/frame_logo.png');
        const frame = await sharp(frame_path).toBuffer();
        const frame_logo = await sharp(frame_logo_path).toBuffer();

        // Compose
        /// resized image needs to be on the bottom layer, frame and logo would be on the top
        const result_buf = await sharp({
          create: {
            width: 1080,
            height: 1440,
            channels: 4,
            background: { r: 0, g: 0, b: 0, alpha: 0 }
          }
        })
          .composite([
            {
              input: resizedImageBuffer, top: 20, left: 18
            },
            {
              input: frame,
            },
            {
              input: frame_logo,
            }
          ])
          .toBuffer();

        // Return final image as base64
        return result_buf.toString('base64');
      } else {
        return image64;
      }
    }
}
