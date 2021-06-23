import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useToolbarStyles } from "./hooks";

export const ToolbarTitle = ({ children }: { children: string }) => {
    return (
        <Typography variant="h6" noWrap>
            {children}
        </Typography>
    );
};

export const ToolbarDesctopSection = ({ children }: { children: React.ReactNode }) => {
    const classes = useToolbarStyles();
    return <div className={classes.sectionDesktop}>{children}</div>;
};

export const ToolbarSpacer = () => {
    const classes = useToolbarStyles();
    return <div className={classes.grow} />;
};

export const ToolbarComponent = ({ children }: { children: React.ReactNode }) => {
    return (
        <AppBar position="static">
            <Toolbar>{children}</Toolbar>
        </AppBar>
    );
};
