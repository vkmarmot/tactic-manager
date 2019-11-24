import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { ObjectListItem } from "../ObjectListItem/ObjectListItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752
        },
        demo: { backgroundColor: theme.palette.background.paper },
        title: { margin: theme.spacing(4, 0, 2) }
    })
);

interface IObjectListProps {
    list: File[];
    onChange(list: File[]): void;
    onSelect(index: number): void;
}

export const ObjectList = ({ list, onSelect, onChange }: IObjectListProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.demo}>
                <List>
                    {list.map((file, index) => (
                        <ObjectListItem
                            onClick={() => {
                                onSelect(index);
                            }}
                            onDelete={() => {
                                const copy = list.slice();
                                copy.splice(index, 1);
                                onChange(copy);
                            }}
                            file={file}
                            key={file.path}
                        />
                    ))}
                </List>
            </div>
        </div>
    );
};
