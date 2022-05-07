const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const webpush = require('web-push');

dotenv.config();

const app = express();

const router = express.Router();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const vapidKeys = webpush.generateVAPIDKeys();

webpush.setGCMAPIKey(process.env.APPLICATION_SERVER_PUBLIC_KEY);
webpush.setVapidDetails(
  'mailto:${process.env.MAIL}',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);


app.get('/', (req, res) => {
  console.log(vapidKeys);
  res.send('Express + TypeScript Server full speed');
});

app.post('/subscribe', (req, res) => {
  
  const subscription = req.body;
  console.log(req);
  console.log(req.body);
  console.log(subscription);

  res.send("Subscription recieved");
});


app.listen(port, () => {
  console.log(`[server]: Server is running full speed at https://localhost:${port}`);
});
