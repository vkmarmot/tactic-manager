import { useEffect, useState } from "react";
import { Bounds, point } from "tactic-geometry";

export const useSvgCaptionPosition = (svg: SVGSVGElement, index: number): Bounds | undefined => {
    const [position, setPosition] = useState<Bounds | undefined>(undefined);
    useEffect(() => {
        setPosition(undefined);
        setTimeout(() => {
            const {parentElement} = svg;
            if (!parentElement) {
                return;
            }
            const texts = svg.getElementsByTagName("text");
            if (texts[index]) {
                const svgParentPosition = parentElement.getBoundingClientRect();
                const boundingClientRect = texts[index].getBoundingClientRect();
                const start = point(
                    boundingClientRect.x - svgParentPosition.x,
                    boundingClientRect.y - svgParentPosition.y
                );
                setPosition(new Bounds(start, start.add(point(boundingClientRect.width, boundingClientRect.height))));
            }
        }, 300);
    }, [svg, index]);

    return position;
};
