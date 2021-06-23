import Button from "@material-ui/core/Button";
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from "electron";
import React, { useCallback } from "react";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";

interface ISaveButtonProps {
    disabled?: boolean;
    className?: string;
    children?: string;
    filter: string;
    title?: string;
    onSave(path: string): void;
}

export const SaveButton: React.FC<ISaveButtonProps> = ({
    title,
    disabled,
    filter,
    className,
    onSave,
    children
}: ISaveButtonProps) => {
    const handler = useCallback(() => {
        remote.dialog
            .showSaveDialog({
                filters: [
                    {
                        name: filter,
                        extensions: [filter]
                    }
                ]
            })
            .then((path) => {
                if (!path.canceled && path.filePath) {
                    onSave(path.filePath);
                }
            });
    }, [filter, onSave]);
    if (!children) {
        return (
            <IconButton title={title} className={className} color="inherit" onClick={handler} disabled={disabled}>
                <SaveIcon />
            </IconButton>
        );
    }
    return (
        <Button
            title={title}
            variant="contained"
            startIcon={<SaveIcon />}
            component="span"
            disabled={disabled}
            onClick={handler}
            className={className}
        >
            {children}
        </Button>
    );
};
