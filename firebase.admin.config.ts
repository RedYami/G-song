// firebase-admin-config.js

import { initializeApp, credential } from 'firebase-admin';

const adminConfig = {
  // Your Firebase Admin SDK configuration
  // ...
};

const adminApp = initializeApp({
  credential: credential.cert(adminConfig),
});

export { adminApp };
