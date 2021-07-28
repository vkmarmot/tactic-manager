import React, { useEffect, useRef } from "react";
import cx from "classnames";
import { useSvgRef } from "../../../hooks/svg";
import { useAppendChild } from "../../effects/SvgEffect";
import {
    absolutizeBounds,
    DEFAULT_H_ALIGN,
    DEFAULT_V_ALIGN,
    ITacticIcon,
    ITacticIconCaptionData,
    updateCaptionPosition
} from "@tmc/icon-util";

import classes from "./SvgView.module.scss";
import { Bounds, point } from "tactic-geometry";
import { ITacticIconMetaData } from "@tmc/icon-util/lib/TacticIcon/ITacticIcon";

function useUpdateCaptionPosition(ref: React.RefObject<HTMLDivElement>, { captions = [], viewBox }: ITacticIconMetaData) {
    useEffect(() => {
        setTimeout(() => {
            if (ref.current && ref.current.firstElementChild) {
                const list = ref.current.firstElementChild.getElementsByTagName("text");
                const maxIndex = Math.min(list.length, captions.length);

                console.log(list.length, captions.length);
                console.log(captions);
                for (let i = 0; i < maxIndex; i++) {
                    const { halign = DEFAULT_H_ALIGN, valign = DEFAULT_V_ALIGN, max, min } = captions[i];
                    const bounds = absolutizeBounds(new Bounds(point(min), point(max)), viewBox);
                    updateCaptionPosition(list[i], { halign, valign, bounds });
                }
                console.log(ref.current.firstElementChild.outerHTML);
            }
        });
    }, [captions]);
}

export const SvgView = React.memo(
    ({
        data,
        className,
        renderChild
    }: {
        data: ITacticIcon;
        className?: string;
        renderChild?(element: SVGSVGElement): React.ReactNode;
    }) => {
        const ref = useRef<HTMLDivElement>(null);
        const [fileContent, error] = useSvgRef(data.svg());
        useAppendChild(ref, fileContent);
        useUpdateCaptionPosition(ref, data.meta);
        return (
            <div className={cx(className, classes.svgViewContainer)}>
                {" "}
                {!fileContent && !error ? <div>Loading..</div> : undefined}
                <div ref={ref} />
                {error ? <div>{error}</div> : undefined}
                {renderChild && fileContent ? renderChild(fileContent) : undefined}
            </div>
        );
    }
);
