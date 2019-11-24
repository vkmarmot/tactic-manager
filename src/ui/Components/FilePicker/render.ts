import { remote } from "electron";
const { dialog } = remote;

export const openFileDialog = () => {
    return dialog.showOpenDialog({ properties: ["openFile", "multiSelections"] });
    // В renderer процессе (web страница).
    // return new Promise((resolve, reject) => {
    //     ipcRenderer.send(FILE_MODAL_QUERY, "ping");
    //     ipcRenderer.on(FILE_MODAL_RESPONSE, (event, arg) => {
    //         console.log(arg); // prints "pong"
    //         resolve();
    //     });
    // });
};
