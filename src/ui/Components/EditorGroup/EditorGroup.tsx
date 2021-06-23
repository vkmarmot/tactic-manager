import React from "react";
import { Paper } from "@material-ui/core";
import cx from "classnames";
import classes from "./EditorGroup.scss";

export const EditorGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <Paper className={cx(classes.editorGroupPaper, className)}>{children}</Paper>;
};
