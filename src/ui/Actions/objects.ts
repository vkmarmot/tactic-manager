import {ITacticIcon} from "@tmc/icon-util";
import {IObjectsSetFiles, IObjectsSetSelected} from "../Reducer/objects";

export const setFiles = (files: ITacticIcon[]): IObjectsSetFiles => ({
    type: "objects:set-files",
    files
});

export const setSelectedFile = (selected: number): IObjectsSetSelected => ({
    type: "objects:set-selected",
    selected
});
