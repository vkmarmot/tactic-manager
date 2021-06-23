import React, { useMemo } from "react";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { useButtonStyles } from "../Button/styles";
import IconButton from "@material-ui/core/IconButton";

interface IFilePickerProps {
    accept?: string;
    content?: React.ReactNode;
    title?: string;
    startIcon?: React.ReactNode;
    onFiles(filePaths: File[]): void;
    onError?(e: any): void;
}

let i = 0;

export const FilePicker = ({ accept, content, onFiles, startIcon, title }: IFilePickerProps) => {
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
            <label key="label" htmlFor={id} title={title}>
                {content ? (
                    <Button
                        startIcon={startIcon}
                        variant="contained"
                        color={"primary"}
                        component="span"
                        className={classes.button}
                    >
                        {content}
                    </Button>
                ) : (
                    undefined
                )}
                {!content ? (
                    <IconButton color={"inherit"} component={"span"} className={classes.button}>
                        {startIcon}
                    </IconButton>
                ) : (
                    undefined
                )}
            </label>
        </>
    );
};
