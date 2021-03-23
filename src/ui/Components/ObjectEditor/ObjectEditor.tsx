import React, {useEffect, useRef, useState} from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {
    createStyles,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
    Theme
} from "@material-ui/core";
import {contentToSvg, ITacticIcon, ITacticIconMetaData} from "@tmc/icon-util";
import {appendChildEffect} from "../../effects/SvgEffect";

import classes from "./ObjectEditor.scss";
import {GROUP_NAMES} from "./constants";
import {useButtonStyles} from "../Button/styles";

interface IObjectEditorProps {
    file: ITacticIcon;
    groups: string[];
    onChange(icon: ITacticIcon): void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: `${theme.spacing(1)}px 0`,
            width: "100%"
        }
    })
);

const cloneIcon = (icon: ITacticIcon, meta: ITacticIconMetaData): ITacticIcon => ({
    svg: icon.svg,
    meta
});

const angles = [0, 90, 180, 270];

export const ObjectEditor = ({ file, groups, onChange }: IObjectEditorProps) => {
    const materialClasses = useStyles();
    // const [file, setCurrentIcon] = useState(iconSrc);
    const setCurrentIcon = onChange;
    // useEffect(() => {
    //     setCurrentIcon(iconSrc);
    // }, [iconSrc]);
    const [fileContent, setFileContent] = useState<false | SVGSVGElement>(false);
    const [error, setError] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setFileContent(false);
        setError("");
        let aborted = false;

        Promise.resolve(file.svg())
            .then(contentToSvg)
            .then(
                (svg) => {
                    if (!aborted) {
                        if (svg) {
                            setFileContent(svg);
                        }
                    }
                },
                (e) => {
                    if (!aborted) {
                        setError(e.message);
                    }
                }
            );
        return () => {
            aborted = true;
        };
    }, [file.svg()]);
    useEffect(appendChildEffect(ref, fileContent), [fileContent]);
    return (
        <form className={classes.ObjectEditorContainer} noValidate autoComplete="off">
            <FormControl className={materialClasses.formControl}>
                <div className={classes.objectEditor}>
                    {!fileContent && !error ? <div>Loading..</div> : undefined}
                    {fileContent ? <div ref={ref} /> : undefined}
                    {error ? <div>{error}</div> : undefined}
                </div>
            </FormControl>
            {/*<div className={classes.ObjectEditorButtons}>*/}
            {/*    <Button*/}
            {/*        variant="contained"*/}
            {/*        component="span"*/}
            {/*        disabled={file === iconSrc}*/}
            {/*        onClick={() => {*/}
            {/*            onChange(file);*/}
            {/*        }}*/}
            {/*        className={classesButton.button}*/}
            {/*    >*/}
            {/*        Save*/}
            {/*    </Button>*/}
            {/*</div>*/}
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
                {fileContent ? (
                    <FormControl contentEditable={false} className={materialClasses.formControl}>
                        <TextField multiline rows={10} value={fileContent.outerHTML} />
                    </FormControl>
                ) : (
                    undefined
                )}
            </div>
        </form>
    );
};
