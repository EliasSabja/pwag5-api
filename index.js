"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors');
const webpush = require('web-push');
dotenv_1.default.config();
const app = (0, express_1.default)();
const router = express_1.default.Router();
const port = process.env.PORT;
app.use(cors());
const vapidKeys = webpush.generateVAPIDKeys();
webpush.setGCMAPIKey(process.env.APPLICATION_SERVER_PUBLIC_KEY);
webpush.setVapidDetails('mailto:${process.env.MAIL}', vapidKeys.publicKey, vapidKeys.privateKey);
app.get('/', (req, res) => {
    console.log(vapidKeys);
    res.send('Express + TypeScript Server full speed');
});
app.get('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: 'Section.io Push notification' });
    webpush.sendNotification(subscription, payload).catch(err => console.log(err));
});
app.listen(port, () => {
    console.log(`[server]: Server is running full speed at https://localhost:${port}`);
});
