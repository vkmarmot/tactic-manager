import fs from "fs";
import { logDebug, logError } from "./Logger";

export const loadFileContent = (file: string) => {
    logDebug("start-load");
    return Promise.resolve(fs.readFileSync(file));
    // return fs.promises
    //     .readFile(file)
    //     .then((data) => {
    //         logDebug(`loaded ${file}`);
    //         return data;
    //     })
    //     .catch((err) => {
    //         logError(err);
    //         throw err;
    //     });
};
