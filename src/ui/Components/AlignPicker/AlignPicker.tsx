import {ALIGN, DEFAULT_H_ALIGN, ITacticIconCaptionData} from "@tmc/icon-util";
import { Button, Grid } from "@material-ui/core";
import React, {useCallback, useMemo, useRef} from "react";
import {AlignPickerButton} from "./AlignPickerButton";

const VALUES: ALIGN[] = ["start", "center", "end"];

export const AlignPicker = ({
    caption,
    onChange
}: {
    caption: ITacticIconCaptionData;
    onChange(caption: ITacticIconCaptionData): void;
}) => {
    const defaultVals: ALIGN[] = useMemo(() => {
        return [caption.halign || DEFAULT_H_ALIGN, caption.valign || DEFAULT_H_ALIGN];
    }, [caption.halign, caption.valign]);
    const ref = useRef(caption);
    ref.current = caption;
    const handler = useCallback(({ halign, valign }: { halign: ALIGN; valign: ALIGN;}) => {
        onChange(
            {
                ...ref.current,
                halign,
                valign
            }
        )
    }, [onChange, ref])
    return (
        <div>
            <Grid container spacing={2}>
                {VALUES.reduce((list, vertical) => {
                    return [
                        ...list,
                        VALUES.map((horizontal) => {
                            return (
                                <Grid item xs={4} key={`${horizontal}-${vertical}`}>
                                    <AlignPickerButton
                                        halign={horizontal}
                                        valign={vertical}
                                        onChange={handler}
                                        disabled={defaultVals[0] === horizontal && defaultVals[1] === vertical}
                                    />
                                </Grid>
                            );
                        })
                    ];
                }, [] as React.ReactNode[])}
            </Grid>
        </div>
    );
};
