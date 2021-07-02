import { Button } from "@material-ui/core";
import React, { useCallback } from "react";
import { ALIGN } from "@tmc/icon-util";

export const AlignPickerButton = React.memo(
    ({
        halign,
        onChange,
        valign,
        disabled
    }: {
        halign: ALIGN;
        valign: ALIGN;
        onChange(e: { halign: ALIGN; valign: ALIGN }): void;
        disabled?: boolean;
    }) => {
        const handler = useCallback(() => {
            onChange({
                halign,
                valign
            });
        }, [onChange, halign, valign]);
        return (
            <Button fullWidth onClick={handler} disabled={disabled} variant="contained" color="secondary">
                *
            </Button>
        );
    }
);
