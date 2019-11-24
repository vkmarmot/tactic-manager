import React from "react";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface IFilePickerProps {
    onFiles(filePaths: File[]): void;
    onError?(e: any): void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: { margin: theme.spacing(1) },
        input: { display: "none" }
    })
);

export const FilePicker = ({ onError, onFiles }: IFilePickerProps) => {
    const classes = useStyles();
    return (
        <div>
            <input
                accept="image/*"
                onChange={(files) => {
                    onFiles(Array.prototype.slice.call(files.target.files));
                }}
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
            />
            <label htmlFor="contained-button-file">
                <Button variant="contained" component="span" className={classes.button}>
                    Upload
                </Button>
            </label>
        </div>
    );
};
