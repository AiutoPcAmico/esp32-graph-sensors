import { checkMasterCertificate } from "./iot/certManager.js";
import { initDevice } from "./iot/index.js";


// downloading remote cert to connect
await checkMasterCertificate();

// connect to mqtt queue
await initDevice();
