import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core";

export interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const useStyles = makeStyles((theme: Theme) => createStyles({ tabPanel: { height: "100%" } }));

export function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div
            role="tabpanel"
            className={classes.tabPanel}
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}
