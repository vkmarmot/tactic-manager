import React, { useEffect, useRef } from "react";
import cx from "classnames";
import { useSvgRef } from "../../../hooks/svg";
import { useAppendChild } from "../../effects/SvgEffect";
import { ITacticIcon, ITacticIconCaptionData, updateCaptionPosition } from "@tmc/icon-util";

import classes from "./SvgView.module.scss";

function useUpdateCaptionPosition(ref: React.RefObject<HTMLDivElement>, captions: ITacticIconCaptionData[]) {
    useEffect(() => {
        setTimeout(() => {
            if (ref.current && ref.current.firstElementChild) {
                const list = ref.current.firstElementChild.getElementsByTagName("text");
                const max = Math.min(list.length, captions.length);

                console.log(list.length, captions.length);
                console.log(captions);
                for (let i = 0; i < max; i++) {
                    const { position } = captions[i];
                    if (position) {
                        updateCaptionPosition(list[i], captions[i]);
                    }
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
        useUpdateCaptionPosition(ref, data.meta.captions || []);
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
