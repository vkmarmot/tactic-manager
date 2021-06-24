import React from "react";
import {ITacticIcon} from "@tmc/icon-util";

export interface ICaptionEditorProps {
    groups: string[];
    onChange(icon: ITacticIcon): void;
}

export const CaptionsEditor = (props: ICaptionEditorProps) => {
    return (
        <div>
        </div>
    )
}
