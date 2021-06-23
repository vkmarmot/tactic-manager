import Button from "@material-ui/core/Button";
// eslint-disable-next-line import/no-extraneous-dependencies
import { remote } from "electron";
import React from "react";
import SaveIcon from '@material-ui/icons/Save';

interface ISaveButtonProps {
    disabled?: boolean;
    className?: string;
    children: string;
    filter: string;
    onSave(path: string): void;
}

export const SaveButton: React.FC<ISaveButtonProps> = ({ disabled, filter, className, onSave, children }: ISaveButtonProps) => (
    <Button
        variant="contained"
        startIcon={<SaveIcon />}
        component="span"
        disabled={disabled}
        onClick={() => {
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
        }}
        className={className}
    >
        {children}
    </Button>
);
