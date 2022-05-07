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

webpush.setGCMAPIKey(process.env.APPLICATION_SERVER_PUBLIC_KEY);
webpush.setVapidDetails(
  'mailto:${process.env.MAIL}',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);


app.get('/', (req, res) => {
  res.send('');
});

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      auth: subscription.keys.auth,
      p256dh: subscription.keys.p256dh
    }
  }
  webpush.sendNotification(pushSubscription, subscription.msg);
  res.send("Subscription recieved");
});


app.listen(port, () => {
  console.log(`[server]: Server is running full speed at https://localhost:${port}`);
});
