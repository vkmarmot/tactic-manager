import {FilePicker} from "../FilePicker/FilePicker";
import {ITacticIcon, parseList} from "@tmc/icon-util";
import {logError} from "../../util/Logger";
import {mergeIconList} from "../../util/IconListUtil";
import {SaveButton} from "../Button/Buttons";
import {saveIconList} from "../../TacticIcon/Saver";
import {Menu} from "../Menu/Menu";
import React from "react";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import {useButtonStyles} from "../Button/styles";

export const ObjectsMenu = ({ onFiles, files }: { onFiles(list: ITacticIcon[]): void, files: ITacticIcon[] }) => {
    const classesButton = useButtonStyles();
    return (
        <Menu>
            <FilePicker
                startIcon={<LibraryBooksIcon />}
                content="Load"
                accept="image/svg+xml, .json, .tmc"
                onFiles={(newFiles) => {
                    parseList(newFiles)
                        .then(onFiles)
                        .catch((e) => {
                            logError(e);
                        });
                }}
                onError={(error) => {
                    logError(error);
                }}
            />
            <FilePicker
                startIcon={<LibraryAddIcon />}
                content="Add"
                accept="image/svg+xml, .json, .tmc"
                onFiles={(newFiles) => {
                    parseList(newFiles)
                        .then((icons) => {
                            onFiles(mergeIconList(files, icons));
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
        </Menu>
    )
}
