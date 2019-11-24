import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import React from "react";
import { Preview } from "../Preview/Preview";

interface IObjectListItemProps {
    file: File;
    onClick(): void;
    onDelete(): void;
}

export const ObjectListItem = ({ file, onClick, onDelete }: IObjectListItemProps) => (
    <ListItem onClick={onClick}>
        <ListItemAvatar>
            <Avatar>
                <Preview file={file} />
            </Avatar>
        </ListItemAvatar>
        <ListItemText primary={file.name} />
        <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                <DeleteIcon />
            </IconButton>
        </ListItemSecondaryAction>
    </ListItem>
);
