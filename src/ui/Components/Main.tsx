import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            flexGrow: 1,
            maxHeight: "100%",
            display: "flex",
            flexDirection: "column",
            flexShrink: 1,
            overflow: "auto",
            padding: theme.spacing(3)
        }
    })
);

export const Main = ({ children }: { children: React.ReactNode }) => {
    const classes = useStyles();
    return <main className={classes.content}>{children}</main>;
};
