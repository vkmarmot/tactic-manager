import React from "react";
import { Paper } from "@material-ui/core";
import classes from "./EditorGroup.scss";

export const EditorGroup = ({ children }: { children: React.ReactNode }) => {
    return <Paper className={classes.editorGroupPaper}>{children}</Paper>;
};
