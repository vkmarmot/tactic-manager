import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ITacticIcon } from "@tmc/icon-util";
import { IObjectStore } from "../../Reducer/objects";
import { setFiles as setFilesAction, setSelectedFile as setSelectedFileAction } from "../../Actions/objects";
import { EditorGroup } from "../EditorGroup/EditorGroup";
import { Load, ObjectsMenu } from "./ObjectsMenu";
import { Main } from "../Main";
import { Root } from "../Root/Root";
import { ToolbarComponent, ToolbarSpacer, ToolbarTitle } from "../Toolbar/Toolbar";
import { ObjectsEditor } from "./ObjectsEditor";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";

export const ObjectsActivity = () => {
    const dispatch = useDispatch();
    const { files, selected } = useSelector((state: IObjectStore) => ({ ...state }));
    const [filter, setFilter] = useState("");
    const setFiles = (list: ITacticIcon[]) => {
        dispatch(setFilesAction(list));
    };
    const setSelectedFile = (file: number) => {
        dispatch(setSelectedFileAction(file));
    };

    return (
        <Root>
            <ToolbarComponent>
                <ToolbarTitle>Object Editor</ToolbarTitle>
                <ToolbarSpacer />
                <ObjectsMenu onFiles={setFiles} files={files} />
            </ToolbarComponent>
            <Main>
                {files.length ? (
                    <ObjectsEditor
                        onFilter={setFilter}
                        onSelectFile={setSelectedFile}
                        onChangeFiles={setFiles}
                        filter={filter}
                        selected={selected}
                        files={files}
                    />
                ) : (
                    <EditorGroup>
                        <div style={{ textAlign: "center" }}>
                            <Load icon={<LibraryBooksIcon />} content={"Открыть"} onFiles={setFiles} />
                        </div>
                    </EditorGroup>
                )}
            </Main>
        </Root>
    );
};

export default ObjectsActivity;
