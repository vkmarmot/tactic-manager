import React from "react";
import { AppBar, createStyles, makeStyles, Tab, Tabs, Theme } from "@material-ui/core";

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}

export interface ITabsContainerProps {
    tabs: React.ReactNode[];
    content: (value: number) => React.ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabsContainerBar: {
        },
        tabsContainerContent: {
            marginTop: `${theme.spacing(2)}px`,
            flex: "1 1",
            height: "100%"
        }
    })
);

export const TabsContainer = ({ tabs, content }: ITabsContainerProps) => {
    const [value, setValue] = React.useState(0);
    const classnames = useStyles();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <>
            <AppBar key={"bar"} position="static" className={classnames.tabsContainerBar} color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    {tabs.map((tab, index) => (
                        <Tab key={String(index)} label={tab} {...a11yProps(1)} />
                    ))}
                </Tabs>
            </AppBar>
            <div className={classnames.tabsContainerContent} key={"data"}>
                {content(value)}
            </div>
        </>
    );
};
