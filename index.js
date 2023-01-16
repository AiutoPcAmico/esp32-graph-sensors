import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";

import express from "express";

const app = express();

// downloading remote cert to connect
await checkMasterCertificate();

// connect to mqtt queue
await initDevice();

app.listen(9000, () => {
    console.log('Server listening on port 9000');
});