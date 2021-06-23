import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { ITacticIcon } from "@tmc/icon-util";
import { ObjectList } from "../ObjectList/ObjectList";
import { ObjectEditor } from "../ObjectEditor/ObjectEditor";
import { IObjectStore } from "../../Reducer/objects";
import { setFiles as setFilesAction, setSelectedFile as setSelectedFileAction } from "../../Actions/objects";

import classes from "./ObjectsActivity.scss";
import { DEFAULT_GROUPS } from "../ObjectEditor/constants";
import { EditorGroup } from "../EditorGroup/EditorGroup";
import { ObjectsMenu } from "./ObjectsMenu";

export const ObjectsActivity = () => {
    const dispatch = useDispatch();
    const { files, selected } = useSelector((state: IObjectStore) => ({ ...state }));
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
                <Grid item xs={12}>
                    <ObjectsMenu onFiles={setFiles} files={files} />
                </Grid>
                <Grid item xs={12}>

                    <Grid className={classes.IconList} item lg={2} md={4} xs={5}>
                        <EditorGroup>
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
                            ) : undefined}
                        </EditorGroup>
                    </Grid>
                    <Grid className={classes.GridElementEditor} item lg={10} md={8} xs={7}>
                        <EditorGroup>
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
                            ) : undefined}
                        </EditorGroup>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
};

export default ObjectsActivity;