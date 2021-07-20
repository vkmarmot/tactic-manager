import React from "react";
import { ITacticIconCaptionData } from "@tmc/icon-util";

import classNames from "./SvgCaptionSelector.module.scss";

const HUNDRED_PERCENTS = 100;

export const SvgCaptionSelector = ({
    file
}: {
    svg: SVGSVGElement;
    selected: number;
    file: ITacticIconCaptionData;
}) => {
    // const position = useSvgCaptionPosition(svg, selected);
    // const size = useMemo(() => (position && position.getSize()) || defaultSize, [position]);
    const { position, scale = [1, 1] } = file;
    if (!position) {
        return null;
    }
    return (
        <div
            className={classNames.captionSelector}
            style={{
                left: `${position[0] * HUNDRED_PERCENTS + 50}%`,
                top: `${position[1] * HUNDRED_PERCENTS + 50}%`,
                width: `${scale[0] * HUNDRED_PERCENTS}%`,
                height: `${scale[1] * HUNDRED_PERCENTS}%`
            }}
        />
    );
};
