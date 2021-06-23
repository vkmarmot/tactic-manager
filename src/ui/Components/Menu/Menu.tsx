import React from "react";

import classes from "./Menu.scss";

export const Menu = ({ children }: { children: React.ReactNode }) => {
    return <div className={classes.ObjectsActivityButtons}>{children}</div>;
};
