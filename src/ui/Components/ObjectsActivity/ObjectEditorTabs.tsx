import React from "react";
import Grid from "@material-ui/core/Grid";
import { ITacticIcon } from "@tmc/icon-util";

import classes from "./ObjectsActivity.scss";
import { EditorGroup } from "../EditorGroup/EditorGroup";
import { ObjectEditor } from "../ObjectEditor/ObjectEditor";
import { TabsContainer } from "../TabsContainer/TabsContainer";
import { TabPanel } from "../TabsContainer/TabPanel";
import { CaptionsEditor } from "../CaptionsEditor/CaptionsEditor";

interface IObjectEditorProps {
    file: ITacticIcon;
    groups: string[];
    onChange(icon: ITacticIcon): void;
}

export const ObjectEditorTabs = ({ file, groups, onChange }: IObjectEditorProps) => {
    return (
        <Grid className={classes.GridElementEditor} item lg={9} md={8} xs={12}>
            <TabsContainer
                tabs={["Редактор свойств", "Редактор подписей"]}
                content={(value: number) => (
                    <>
                        <TabPanel key={"panel1"} value={value} index={0}>
                            <EditorGroup className={classes.EditorContainer}>
                                <ObjectEditor groups={groups} file={file} onChange={onChange} />
                            </EditorGroup>
                        </TabPanel>
                        <TabPanel key={"panel2"} value={value} index={1}>
                            <EditorGroup className={classes.EditorContainer}>
                                <CaptionsEditor file={file} onChange={onChange} />
                            </EditorGroup>
                        </TabPanel>
                    </>
                )}
            />
        </Grid>
    );
};
