import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import {ITacticIcon} from "@tmc/icon-util";

import { Preview } from "../Preview/Preview";

import classes from "./ObjectListItem.scss";


interface IObjectListItemProps {
    file: ITacticIcon;
    selected: boolean;
    onClick(): void;
    onDelete(): void;
}

export const ObjectListItem = ({ file, selected, onClick, onDelete }: IObjectListItemProps) => (
    <ListItem selected={selected} onClick={onClick}>
        <ListItemAvatar>
            <Avatar>
                <Preview file={file} />
            </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.objectListItem_Name} primary={file.meta.name} />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);
