import mongoose from "mongoose";
import { mongooseConnection } from "../config.js";

export function connectToDb() {
    mongoose.Promise = global.Promise;
    mongoose.connect(mongooseConnection);
}


var nameSchema = new mongoose.Schema({
    timestamp: Number,
    hum: Number,
    value: Number,
    sensorCode: String,
    creatorMessage: String
});

var datalog = mongoose.model("datalog", nameSchema);

export async function saveToDb(singular) {
    let jsonFormat = JSON.parse(singular)
    console.log(jsonFormat)
    jsonFormat["creatorMessage"] = "Andrea"

    var myData = new datalog(jsonFormat)

    await myData.save()
        .then(item => {
            console.log("Item saved!")
        })
        .catch(err => {
            console.log("Unable to save into DB")
        });

}

export async function retrieveData() {
    const result = await datalog.find({ creatorMessage: "Andrea" });
    return result
}