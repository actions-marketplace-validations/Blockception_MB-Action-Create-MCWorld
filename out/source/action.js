import * as fs from "fs";
import { Package } from "./Package";
import { PackageContext } from "./types/PackageContext";
//Leave this be
const corexp = require("@actions/core");
//Start code
try {
    let Context = new PackageContext();
    //grabbing context
    Context.Folder = corexp.getInput("folder");
    Context.ProcessJson = corexp.getInput("processJson") === "true";
    Context.TrimFiles = corexp.getInput("trimFiles") === "true";
    if (fs.existsSync(Context.Folder)) {
        const temp = await Process(Context);
    }
    else {
        throw { message: "Couldnt not find folder: " + Context.Folder };
    }
}
catch (error) {
    let message;
    if (error.message)
        message = error.message;
    else
        message = JSON.stringify(error);
    if (corexp)
        corexp.setFailed(message);
    else {
        console.log(message);
        process.exit(1);
    }
}
async function Process(Context) {
    console.log("starting on: " + Context.Folder);
    let result = await Package(Context);
    if (fs.existsSync(result)) {
        console.log("File created: " + result);
        process.exit(0);
    }
    else {
        console.log("Creation failed: " + result);
        process.exit(1);
    }
}
//# sourceMappingURL=action.js.map