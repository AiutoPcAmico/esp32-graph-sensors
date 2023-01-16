import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";

import express from "express";


// downloading remote cert to connect
await checkMasterCertificate();

// connect to mqtt queue
await initDevice();
