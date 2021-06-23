import { FilePicker } from "../FilePicker/FilePicker";
import { ITacticIcon, parseList } from "@tmc/icon-util";
import { logError } from "../../util/Logger";
import { mergeIconList } from "../../util/IconListUtil";
import { SaveButton } from "../Button/Buttons";
import { saveIconList } from "../../TacticIcon/Saver";
import React from "react";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import { useButtonStyles } from "../Button/styles";
import { ToolbarDesctopSection } from "../Toolbar/Toolbar";

export const Load = ({
    icon,
    onFiles,
    content
}: {
    content?: React.ReactNode;
    icon?: React.FunctionComponentElement<any>;
    onFiles(files: ITacticIcon[]): void;
}) => {
    return (
        <FilePicker
            title={"Загрузить"}
            content={content}
            startIcon={icon}
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
    );
};

export const ObjectsMenu = ({ onFiles, files }: { onFiles(list: ITacticIcon[]): void; files: ITacticIcon[] }) => {
    const classesButton = useButtonStyles();
    return (
        <ToolbarDesctopSection>
            <Load icon={<LibraryBooksIcon />} onFiles={onFiles} />
            <FilePicker
                title={"Добавить"}
                startIcon={<LibraryAddIcon />}
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
                title={"Сохранить"}
                filter="json"
                disabled={!files.length}
                onSave={(path) => {
                    saveIconList(path, files);
                }}
                className={classesButton.button}
            />
        </ToolbarDesctopSection>
    );
};
