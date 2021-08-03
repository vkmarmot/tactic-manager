import Button from "@material-ui/core/Button";
// eslint-disable-next-line import/no-extraneous-dependencies
import { saveAs } from "file-saver";
import React, { useCallback } from "react";
import SaveIcon from "@material-ui/icons/Save";
import IconButton from "@material-ui/core/IconButton";

interface ISaveButtonProps {
    disabled?: boolean;
    className?: string;
    children?: string;
    filter: string;
    title?: string;
    toSave(): string;
}

export const SaveButton: React.FC<ISaveButtonProps> = ({
    title,
    disabled,
    filter,
    className,
    toSave,
    children
}: ISaveButtonProps) => {
    const handler = useCallback(() => {
        const data = toSave();
        const blob = new Blob([data], {type: "application/json;charset=utf-8"});
        saveAs(blob, "icons.json")
    }, [filter, toSave]);
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
