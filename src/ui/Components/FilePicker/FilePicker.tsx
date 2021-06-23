import React, { useMemo } from "react";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useButtonStyles } from "../Button/styles";

interface IFilePickerProps {
    accept?: string;
    content: React.ReactNode;
    startIcon?: React.ReactNode;
    onFiles(filePaths: File[]): void;
    onError?(e: any): void;
}

let i = 0;

export const FilePicker = ({ accept, content, onFiles, startIcon }: IFilePickerProps) => {
    const classes = useButtonStyles();
    const index = useMemo(() => i++, []);
    const id = `id-for-file-picker-${index}`;
    return (
        <>
            <input
                key="input"
                accept={accept}
                onChange={(files) => {
                    onFiles(Array.prototype.slice.call(files.target.files));
                }}
                className={classes.input}
                id={id}
                multiple
                type="file"
            />
            <label key="label" htmlFor={id}>
                <Button
                    startIcon={startIcon}
                    variant="contained"
                    color={"primary"}
                    component="span"
                    className={classes.button}
                >
                    {content}
                </Button>
            </label>
        </>
    );
};
