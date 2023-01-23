import { secretMasterName, host } from '../config.js';
import awsIot from 'aws-iot-device-sdk';
import AWS from 'aws-sdk';
import { connectToDb, retrieveData, saveToDb } from './dbConnection.js';
import express from 'express';
import cors from 'cors';

const apiproject = express();
const port = 16123



// Then pass these options to cors:
apiproject.use(cors({ origin: '*' }));



apiproject.get('/fetchsensors', async (req, res) => {
    const data = await retrieveData()
    res.send(data);
});

apiproject.listen(port, () => console.log(`Hello world app listening on port ${port}!`))


// setting aws region to connect
AWS.config.update({ region: 'eu-central-1' });

const iot = new AWS.Iot();
connectToDb()

let device;

export function initDevice() {
    device = awsIot.device({
        keyPath: `./certs/${secretMasterName}.private.pem.key`,
        certPath: `./certs/${secretMasterName}.certificate.pem.crt`,
        caPath: `./certs/AmazonRootCA1.pem`,
        host: host
    });


    device.on('connect', function () {
        console.info('system connected to aws iot...');
        device.subscribe('machines');
        console.info('mqtt parser ready...');
    });

    device.on('error', function (e) {
        console.info({ e });
    });

    device.on('message', async function (topic, payload) {
        console.info('message received');

        await saveToDb(payload.toString());



    });
}

function parser(message) {
    let objectMessage;
    try {
        objectMessage = JSON.parse(message);
    } catch (err) {
        console.error(`error parsing message: ${message}`);
    }

    console.log(objectMessage);
}
