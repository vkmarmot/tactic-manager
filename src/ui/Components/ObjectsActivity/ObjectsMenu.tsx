import { ITacticIcon, parseList } from "@tmc/icon-util";
import LibraryAddIcon from "@material-ui/icons/LibraryAdd";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import React, { useRef } from "react";

import { FilePicker } from "../FilePicker/FilePicker";
import { logError } from "../../util/Logger";
import { saveIconList } from "../../TacticIcon/Saver";
import { mergeIconList } from "../../util/IconListUtil";
import { SaveButton } from "../Button/Buttons";

import { useButtonStyles } from "../Button/styles";
import { ToolbarDesctopSection } from "../Toolbar/Toolbar";

import classnames from "./ObjectsMenu.scss";

export const Load = ({
    icon,
    onFiles,
    content
}: {
    content?: React.ReactNode;
    icon?: React.FunctionComponentElement<any>;
    onFiles(files: ITacticIcon[]): void;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
        <>
            <FilePicker
                key={"picker"}
                title={"Загрузить"}
                content={content}
                startIcon={icon}
                accept="image/svg+xml, .json, .tmc"
                onFiles={(newFiles) => {
                    parseList(ref.current!)(newFiles)
                        .then(onFiles)
                        .catch((e) => {
                            logError(e);
                        });
                }}
                onError={(error) => {
                    logError(error);
                }}
            />
            <div className={classnames.divContainer} key={"loader"} ref={ref} />
        </>
    );
};

export const ObjectsMenu = ({ onFiles, files }: { onFiles(list: ITacticIcon[]): void; files: ITacticIcon[] }) => {
    const classesButton = useButtonStyles();
    const ref = useRef<HTMLDivElement>(null);
    return (
        <ToolbarDesctopSection>
            <div className={classnames.divContainer} ref={ref} />
            <Load icon={<LibraryBooksIcon />} onFiles={onFiles} />
            <FilePicker
                title={"Добавить"}
                startIcon={<LibraryAddIcon />}
                accept="image/svg+xml, .json, .tmc"
                onFiles={(newFiles) => {
                    parseList(ref.current!)(newFiles)
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
