import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";

import { FilePicker } from "../FilePicker/FilePicker";
import { ObjectList } from "../ObjectList/ObjectList";
import { ObjectEditor } from "../ObjectEditor/ObjectEditor";
import { IObjectStore } from "../../Reducer/objects";
import { setFiles as setFilesAction, setSelectedFile as setSelectedFileAction } from "../../Actions/objects";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: { margin: theme.spacing(1) },
        input: { display: "none" }
    })
);

interface IObjectsActivityProps {
    files: File[];
    selected: number;
    setSelectedFile(selected: number): void;
    setFiles(files: File[]): void;
}

export const ObjectsActivity = ({ files, selected, setFiles, setSelectedFile }: IObjectsActivityProps) => {
    return (
        <div>
            <FilePicker
                onFiles={(newFiles) => {
                    setFiles(newFiles);
                }}
                onError={(error) => {}}
            />
            {files.length ? (
                <ObjectList
                    onSelect={(index) => {
                        setSelectedFile(index);
                    }}
                    onChange={(newFiles) => {
                        setFiles(newFiles);
                    }}
                    list={files}
                />
            ) : (
                undefined
            )}
            {selected > -1 && files[selected] ? <ObjectEditor file={files[selected]} /> : undefined}
        </div>
    );
};

export default connect((state: IObjectStore) => ({ ...state }), {
    setFiles: setFilesAction,
    setSelectedFile: setSelectedFileAction
})(ObjectsActivity);
