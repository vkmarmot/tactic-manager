import React, { useCallback, useState } from "react";
import { ITacticIcon, ITacticIconCaptionData } from "@tmc/icon-util";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@material-ui/core";
import { SvgView } from "../SvgView/SvgView";
import { useEditorGroupStyles } from "../EditorGroup/editorGroupStyles";

import classes from "../ObjectEditor/ObjectEditor.scss";
import { SvgCaptionSelector } from "../SvgCaptionSelector/SvgCaptionSelector";
import { AlignPicker } from "../AlignPicker/AlignPicker";

export interface ICaptionEditorProps {
    file: ITacticIcon;
    onChange(icon: ITacticIcon): void;
}

export const CaptionsEditor = ({ file, onChange }: ICaptionEditorProps) => {
    const materialClasses = useEditorGroupStyles();
    const [captionSelected, setCaptionSelected] = useState(0);
    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLSelectElement>) => {
            setCaptionSelected(parseInt(e.target.value, 10));
        },
        [setCaptionSelected]
    );
    const handlRenderChild = useCallback(
        (svg: SVGSVGElement) => <SvgCaptionSelector svg={svg} selected={captionSelected} />,
        [captionSelected]
    );
    const handleAlignChange = useCallback(
        (caption: ITacticIconCaptionData) => {
            if (!file.meta.captions) {
                return;
            }
            const captionsCopy = file.meta.captions.slice();
            captionsCopy[captionSelected] = caption;
            onChange({
                ...file,
                meta: {
                    ...file.meta,
                    captions: captionsCopy
                }
            });
        },
        [onChange, captionSelected]
    );
    if (!file.meta.captions) {
        return null;
    }
    return (
        <form className={classes.ObjectEditorContainer} noValidate autoComplete="off">
            <Grid container className={classes.root} spacing={2}>
                <Grid item md={6} lg={6} xs={12}>
                    <div className={classes.ObjectEditorControls}>
                        <FormControl className={materialClasses.formControl}>
                            <InputLabel id="demo-simple-select-label">Подпись</InputLabel>
                            <Select id="captions ddown" value={captionSelected} onChange={handleChange}>
                                {file.meta.captions.map((c, index) => (
                                    <MenuItem key={c.textid || `id-${index}`} value={index}>
                                        Подпись {index + 1}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <div className={materialClasses.formControl}>
                            <InputLabel id="demo-simple-select-label">Выравнивание</InputLabel>
                            <AlignPicker onChange={handleAlignChange} caption={file.meta.captions[captionSelected]} />
                        </div>
                    </div>
                </Grid>

                <Grid item md={6} lg={6} xs={12}>
                    <FormControl className={materialClasses.formControl}>
                        <SvgView data={file} renderChild={handlRenderChild} className={classes.objectEditor} />
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
};
