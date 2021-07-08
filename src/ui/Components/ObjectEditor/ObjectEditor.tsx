import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import {
    createStyles,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Theme
} from "@material-ui/core";
import { ITacticIcon, ITacticIconMetaData } from "@tmc/icon-util";

import classes from "./ObjectEditor.scss";
import { GROUP_NAMES } from "./constants";
import { SvgView } from "../SvgView/SvgView";
import { SvgContentView } from "../SvgContentView/SvgContentView";
import {useEditorGroupStyles} from "../EditorGroup/editorGroupStyles";

interface IObjectEditorProps {
    file: ITacticIcon;
    groups: string[];
    onChange(icon: ITacticIcon): void;
}


const cloneIcon = (icon: ITacticIcon, meta: ITacticIconMetaData): ITacticIcon => ({
    svg: icon.svg,
    meta
});

const angles = [0, 90, 180, 270];

export const ObjectEditor = ({ file, groups, onChange }: IObjectEditorProps) => {
    const materialClasses = useEditorGroupStyles();
    // const [file, setCurrentIcon] = useState(iconSrc);
    const setCurrentIcon = onChange;
    // useEffect(() => {
    //     setCurrentIcon(iconSrc);
    // }, [iconSrc]);
    return (
        <form className={classes.ObjectEditorContainer} noValidate autoComplete="off">
            <Grid container className={classes.root} spacing={2}>
                <Grid item md={6} lg={6} xs={12}>
                    <div className={classes.ObjectEditorControls}>
                        <FormControl className={materialClasses.formControl}>
                            <TextField
                                label="Icon id"
                                value={file.meta.id}
                                onChange={(e) => {
                                    setCurrentIcon(
                                        cloneIcon(file, {
                                            ...file.meta,
                                            id: e.target.value
                                        })
                                    );
                                }}
                            />
                        </FormControl>
                        <FormControl className={materialClasses.formControl}>
                            <TextField
                                label="КЭУЗ id"
                                value={file.meta.keuz || ""}
                                onChange={(e) => {
                                    setCurrentIcon(
                                        cloneIcon(file, {
                                            ...file.meta,
                                            keuz: e.target.value
                                        })
                                    );
                                }}
                            />
                        </FormControl>
                        <FormControl className={materialClasses.formControl}>
                            <TextField
                                label="Панорама id"
                                value={file.meta.panoramaId || ""}
                                onChange={(e) => {
                                    setCurrentIcon(
                                        cloneIcon(file, {
                                            ...file.meta,
                                            panoramaId: e.target.value
                                        })
                                    );
                                }}
                            />
                        </FormControl>
                        <FormControl className={materialClasses.formControl}>
                            <TextField
                                label="Icon name"
                                value={file.meta.name || file.meta.id}
                                onChange={(e) => {
                                    setCurrentIcon(
                                        cloneIcon(file, {
                                            ...file.meta,
                                            name: e.target.value
                                        })
                                    );
                                }}
                            />
                        </FormControl>
                        <FormControl className={materialClasses.formControl}>
                            <InputLabel id="demo-simple-select-label">Angle</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                value={file.meta.defaultAngle || 0}
                                onChange={(e) => {
                                    setCurrentIcon(
                                        cloneIcon(file, {
                                            ...file.meta,
                                            defaultAngle: e.target.value as any
                                        })
                                    );
                                }}
                            >
                                {angles.map((angle) => (
                                    <MenuItem key={`angle-${angle}`} value={angle}>
                                        {angle}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={materialClasses.formControl}>
                            <InputLabel id="group-selector">Group</InputLabel>
                            <Select
                                labelId="group-selector"
                                value={file.meta.group || "default"}
                                onChange={(e) => {
                                    setCurrentIcon(
                                        cloneIcon(file, {
                                            ...file.meta,
                                            group: e.target.value as any
                                        })
                                    );
                                }}
                            >
                                {groups.map((group) => (
                                    <MenuItem key={`group-${group}`} value={group}>
                                        {GROUP_NAMES[group] || group}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl className={materialClasses.formControl} component="fieldset">
                            <FormLabel component="legend">Orientation</FormLabel>
                            <RadioGroup
                                aria-label="orientation"
                                name="orientation"
                                value={file.meta.rotationType}
                                onChange={(e) => {
                                    setCurrentIcon(
                                        cloneIcon(file, {
                                            ...file.meta,
                                            rotationType: e.target.value as any
                                        })
                                    );
                                }}
                            >
                                <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
                                <FormControlLabel value="flip" control={<Radio />} label="Flip" />
                                <FormControlLabel value="rotate" control={<Radio />} label="Rotate" />
                            </RadioGroup>
                        </FormControl>
                        <FormControl className={materialClasses.formControl}>
                            <TextField
                                label="Комментарий"
                                value={file.meta.comment || ""}
                                onChange={(e) => {
                                    setCurrentIcon(
                                        cloneIcon(file, {
                                            ...file.meta,
                                            comment: e.target.value
                                        })
                                    );
                                }}
                            />
                        </FormControl>
                    </div>
                </Grid>

                <Grid item md={6} lg={6} xs={12}>
                    <FormControl className={materialClasses.formControl}>
                        <SvgView data={file} className={classes.objectEditor} />
                    </FormControl>

                    <FormControl contentEditable={false} className={materialClasses.formControl}>
                        <SvgContentView svg={file.svg()} />
                    </FormControl>
                </Grid>
            </Grid>
        </form>
    );
};
