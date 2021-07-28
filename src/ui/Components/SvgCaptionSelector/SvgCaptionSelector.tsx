import React, { useMemo } from "react";
import { useSvgCaptionPosition } from "./hooks";
import { point } from "tactic-geometry";

import classNames from "./SvgCaptionSelector.module.scss";
import { ITacticIconCaptionData } from "@tmc/icon-util";

const defaultSize = point(0, 0);

export const SvgCaptionSelector = ({ selected, svg }: { svg: SVGSVGElement; selected: ITacticIconCaptionData | undefined }) => {
    const position = useSvgCaptionPosition(svg, selected);
    const size = useMemo(() => (position && position.getSize()) || defaultSize, [position]);
    if (!position) {
        return null;
    }
    return (
        <div
            className={classNames.captionSelector}
            style={{
                transform: `translate3d(${position.min.x}px, ${position.min.y}px, 0)`,
                width: size.x,
                height: size.y
            }}
        />
    );
};
