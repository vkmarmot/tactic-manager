import React, { useEffect, useRef } from "react";
import cx from "classnames";
import { useSvgRef } from "../../../hooks/svg";
import { appendChildEffect } from "../../effects/SvgEffect";

import classes from "./SvgView.module.scss";

export const SvgView = React.memo(
    ({
        svg,
        className,
        renderChild
    }: {
        svg: string;
        className?: string;
        renderChild?(element: SVGSVGElement): React.ReactNode;
    }) => {
        const ref = useRef<HTMLDivElement>(null);
        const [fileContent, error] = useSvgRef(svg);
        useEffect(appendChildEffect(ref, fileContent), [fileContent]);
        return (
            <div className={cx(className, classes.svgViewContainer)}>
                {" "}
                {!fileContent && !error ? <div>Loading..</div> : undefined}
                {fileContent ? <div ref={ref} /> : undefined}
                {error ? <div>{error}</div> : undefined}
                {renderChild && fileContent ? renderChild(fileContent) : undefined}
            </div>
        );
    }
);
