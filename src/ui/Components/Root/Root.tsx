import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { display: "flex", height: "100%", flexDirection: "column" }
    })
);

export const Root = ({ children }: { children: React.ReactNode }) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CssBaseline />
            {children}
        </div>
    );
};
