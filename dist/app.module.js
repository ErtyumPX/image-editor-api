"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const ai_service_1 = require("./ai/ai.service");
const editor_controller_1 = require("./editor/editor.controller");
const editor_service_1 = require("./editor/editor.service");
const storage_service_1 = require("./storage/storage.service");
const identifier_service_1 = require("./identifier/identifier.service");
const firebase_service_1 = require("./firebase/firebase.service");
const storage_controller_1 = require("./storage/storage.controller");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot()],
        controllers: [
            app_controller_1.AppController,
            editor_controller_1.EditorController,
            storage_controller_1.StorageController
        ],
        providers: [
            ai_service_1.AiService,
            editor_service_1.EditorService,
            storage_service_1.StorageService,
            identifier_service_1.IdentifierService,
            firebase_service_1.FirebaseService
        ],
    })
], AppModule);
const admin = require("firebase-admin");
let keys = process.env.SERVICE_ACCOUNT_KEY;
if (keys[0] === "'") {
    keys = keys.slice(1, -1);
}
if (keys[-1] === "'") {
    keys = keys.slice(0, -1);
}
const serviceAccount = JSON.parse(keys);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.STORAGE_BUCKET,
});
//# sourceMappingURL=app.module.js.map