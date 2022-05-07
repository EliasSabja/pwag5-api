import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

const cors = require('cors');
const webpush = require('web-push');

dotenv.config();

const app: Express = express();
const router = express.Router();
const port = process.env.PORT || 3000;

app.use(cors());

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setGCMAPIKey(process.env.APPLICATION_SERVER_PUBLIC_KEY);
webpush.setVapidDetails(
  'mailto:${process.env.MAIL}',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


app.get('/', (req: Request, res: Response) => {
  console.log(vapidKeys);
  res.send('Express + TypeScript Server full speed');
});

app.get('/subscribe', (req: Request, res: Response) => {
  
  const subscription = req.body;

  res.status(201).json({});

  const payload = JSON.stringify({title: 'Section.io Push notification'});

  webpush.sendNotification(subscription, payload).catch((err: any) => console.log(err));
});


app.listen(port, () => {
  console.log(`[server]: Server is running full speed at https://localhost:${port}`);
});
