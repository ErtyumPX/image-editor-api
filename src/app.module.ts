import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AiService } from './ai/ai.service';
import { EditorController } from './editor/editor.controller';
import { EditorService } from './editor/editor.service';
import { StorageService } from './storage/storage.service';
import { IdentifierService } from './identifier/identifier.service';
import { FirebaseService } from './firebase/firebase.service';
import { StorageController } from './storage/storage.controller';

@Module({
    imports: [ConfigModule.forRoot()],
    controllers: [
        AppController,
        EditorController,
        StorageController],
    providers: [
        AiService, 
        EditorService, 
        StorageService, 
        IdentifierService, 
        FirebaseService
    ],
})
export class AppModule {}

import * as admin from 'firebase-admin';

let keys = process.env.SERVICE_ACCOUNT_KEY as string;
if (keys[0] === "'"){
    keys = keys.slice(1, -1);
}
if (keys[-1] === "'"){
    keys = keys.slice(0, -1);
}
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY as string);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
});

