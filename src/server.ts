import express, { Request, Response } from 'express';
import * as admin from 'firebase-admin';

// Initialize Firebase Admin SDK with service account key
const serviceAccount = require('./path/to/your-service-account-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
const PORT = 5176;

// Endpoint to fetch email by UID
app.get('/get-email/:uid', async (req: Request, res: Response) => {
  const { uid } = req.params;
  try {
    const userRecord = await admin.auth().getUser(uid);
    res.status(200).json({ email: userRecord.email });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ error: 'Failed to fetch user data.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
