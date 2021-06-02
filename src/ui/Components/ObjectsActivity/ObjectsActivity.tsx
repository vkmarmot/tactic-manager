import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ITacticIcon, parseList } from "@tmc/icon-util";

import { FilePicker } from "../FilePicker/FilePicker";
import { ObjectList } from "../ObjectList/ObjectList";
import { ObjectEditor } from "../ObjectEditor/ObjectEditor";
import { IObjectStore } from "../../Reducer/objects";
import { setFiles as setFilesAction, setSelectedFile as setSelectedFileAction } from "../../Actions/objects";
import { logError } from "../../util/Logger";
import { useButtonStyles } from "../Button/styles";
import { saveIconList, saveIconListLegacy } from "../../TacticIcon/Saver";
import { SaveButton } from "../Button/Buttons";
import { mergeIconList } from "../../util/IconListUtil";

import classes from "./ObjectsActivity.scss";
import {DEFAULT_GROUPS} from "../ObjectEditor/constants";

export const ObjectsActivity = () => {
    const dispatch = useDispatch();
    const { files, selected } = useSelector((state: IObjectStore) => ({ ...state }));
    const classesButton = useButtonStyles();
    const hasDataToView = selected > -1 && files[selected];
    const [filter, setFilter] = useState("");
    const [groups, setGroups] = useState<string[]>(DEFAULT_GROUPS);
    const setFiles = (list: ITacticIcon[]) => {
        dispatch(setFilesAction(list));
    };
    const setSelectedFile = (file: number) => {
        dispatch(setSelectedFileAction(file));
    };

    useEffect(() => {
        setGroups([...new Set([...files.map((file) => file.meta.group || "default"), ...DEFAULT_GROUPS])]);
    }, [files]);

    return (
        <div className={classes.ObjectsActivity}>
            <Grid className={classes.GridRoot} container spacing={3}>
                <Grid className={classes.IconList} item xs={4}>
                    <div className={classes.ObjectsActivityButtons}>
                        <FilePicker
                            content="Load"
                            accept="image/svg+xml, .json, .tmc"
                            onFiles={(newFiles) => {
                                parseList(newFiles)
                                    .then(setFiles)
                                    .catch((e) => {
                                        logError(e);
                                    });
                            }}
                            onError={(error) => {
                                logError(error);
                            }}
                        />
                        <FilePicker
                            content="Add"
                            accept="image/svg+xml, .json, .tmc"
                            onFiles={(newFiles) => {
                                parseList(newFiles)
                                    .then((icons) => {
                                        setFiles(mergeIconList(files, icons));
                                        // setFiles([...files, ...icons]);
                                    })
                                    .catch((e) => {
                                        logError(e);
                                    });
                            }}
                            onError={(error) => {
                                logError(error);
                            }}
                        />

                        <SaveButton
                            filter="json"
                            disabled={!files.length}
                            onSave={(path) => {
                                saveIconList(path, files);
                            }}
                            className={classesButton.button}
                        >
                            Save
                        </SaveButton>
                    </div>
                    <TextField
                        className={classes.ObjectsActivityFilter}
                        label="Filter"
                        onChange={(e) => {
                            // clearTimeout(ref.current);
                            // ref.current = setTimeout(() => {
                            setFilter(e.target.value);
                            // }, 500) as any;
                        }}
                        value={filter}
                    />
                    {files.length ? (
                        <ObjectList
                            filter={filter}
                            onSelect={(index) => {
                                setSelectedFile(index);
                            }}
                            onChange={(newFiles) => {
                                setFiles(newFiles);
                            }}
                            list={files}
                            selected={selected}
                        />
                    ) : (
                        undefined
                    )}
                </Grid>
                <Grid className={classes.GridElementEditor} item xs={8}>
                    {hasDataToView ? (
                        <ObjectEditor
                            groups={groups}
                            file={files[selected]}
                            onChange={(file) => {
                                const newFiles = files.slice();
                                newFiles[selected] = file;
                                setFiles(newFiles);
                            }}
                        />
                    ) : (
                        undefined
                    )}
                </Grid>
            </Grid>
        </div>
    );
};

export default ObjectsActivity;
