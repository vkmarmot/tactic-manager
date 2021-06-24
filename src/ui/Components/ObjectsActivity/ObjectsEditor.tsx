import Grid from "@material-ui/core/Grid";
import classes from "./ObjectsActivity.scss";
import { EditorGroup } from "../EditorGroup/EditorGroup";
import TextField from "@material-ui/core/TextField";
import { ObjectList } from "../ObjectList/ObjectList";
import React, { useEffect, useState } from "react";
import { DEFAULT_GROUPS } from "../ObjectEditor/constants";
import { ITacticIcon } from "@tmc/icon-util";
import { ObjectEditorTabs } from "./ObjectEditorTabs";

export interface IObjectsEditorProps {
    onFilter(filter: string): void;
    onSelectFile(index: number): void;
    onChangeFiles(files: ITacticIcon[]): void;
    filter: string;
    selected: number;
    files: ITacticIcon[];
}

export const ObjectsEditor = ({
    onFilter,
    onSelectFile,
    onChangeFiles,
    filter,
    selected,
    files
}: IObjectsEditorProps) => {
    const [groups, setGroups] = useState<string[]>(DEFAULT_GROUPS);
    const hasDataToView = selected > -1 && files[selected];

    useEffect(() => {
        setGroups([...new Set([...files.map((file) => file.meta.group || "default"), ...DEFAULT_GROUPS])]);
    }, [files]);
    return (
        <Grid className={classes.GridRoot} container spacing={2}>
            <Grid className={classes.IconList} item lg={3} md={4} xs={12}>
                <EditorGroup>
                    <TextField
                        className={classes.ObjectsActivityFilter}
                        label="Filter"
                        onChange={(e) => {
                            // clearTimeout(ref.current);
                            // ref.current = setTimeout(() => {
                            onFilter(e.target.value);
                            // }, 500) as any;
                        }}
                        value={filter}
                    />
                    {files.length ? (
                        <ObjectList
                            filter={filter}
                            onSelect={(index) => {
                                onSelectFile(index);
                            }}
                            onChange={(newFiles) => {
                                onChangeFiles(newFiles);
                            }}
                            list={files}
                            selected={selected}
                        />
                    ) : (
                        undefined
                    )}
                </EditorGroup>
            </Grid>
            {hasDataToView ? (
                <ObjectEditorTabs
                    groups={groups}
                    file={files[selected]}
                    onChange={(file) => {
                        const newFiles = files.slice();
                        newFiles[selected] = file;
                        onChangeFiles(newFiles);
                    }}
                />
            ) : (
                undefined
            )}
        </Grid>
    );
};
