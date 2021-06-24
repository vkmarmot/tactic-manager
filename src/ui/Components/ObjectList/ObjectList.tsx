import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { TreeComponent } from "virtualized-tree/dist";
import { ITacticIcon } from "@tmc/icon-util";

import { ObjectListItem } from "../ObjectListItem/ObjectListItem";
import { TreeElement, TreeElementWithOffset } from "virtualized-tree/dist/types";
import styleUtil from "../../styles/Utils.scss";
import {List} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxHeight: "100%",
        },
        demo: { backgroundColor: theme.palette.background.paper },
        title: { margin: theme.spacing(4, 0, 2) }
    })
);

interface IObjectListProps {
    list: ITacticIcon[];
    filter?: string;
    selected: number;
    onChange(list: ITacticIcon[]): void;
    onSelect(index: number): void;
}

export const ObjectList = ({ list, filter = "", onSelect, selected, onChange }: IObjectListProps) => {
    const classes = useStyles();
    const filteredFiles =
        filter !== "" ? list.filter((icon) => icon.meta.name.includes(filter) || icon.meta.id.includes(filter)) : list;
    const idToFile: {[key: string]: ITacticIcon} = list.reduce((obj, f) => ({ ...obj, [f.meta.id]: f }), Object.create(null));
    const selectedIcon = list[selected];
    return (
        <div className={`${classes.root} ${styleUtil.FlexHidden}`}>
            <div className={`${classes.demo} ${styleUtil.FlexHidden}`}>
                <List className={styleUtil.FlexHidden}>
                    <TreeComponent
                        tree={filteredFiles.map(
                            (elem): TreeElement => ({
                                id: elem.meta.id,
                                collapsed: false
                            })
                        )}
                        setCollapsed={() => {}}
                        onReorder={() => {}}
                        enableDrag={false}
                        childrenHeight={56}
                        scrollTo={undefined}
                    >
                        {(elementWithOffset: TreeElementWithOffset, attributes: React.HTMLAttributes<any>) => {
                            const file = idToFile[elementWithOffset.id];
                            return (
                                <div {...attributes} key={elementWithOffset.id}>
                                    <ObjectListItem
                                        selected={selectedIcon && file.meta.id === selectedIcon.meta.id}
                                        onClick={() => {
                                            onSelect(list.indexOf(file));
                                        }}
                                        onDelete={() => {
                                            const copy = list.slice();
                                            copy.splice(list.indexOf(file), 1);
                                            onChange(copy);
                                        }}
                                        file={file}
                                        key={file.meta.id}
                                    />
                                </div>
                            );
                        }}
                    </TreeComponent>
                </List>
            </div>
        </div>
    );
};
