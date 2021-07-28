import { useEffect, useState } from "react";
import { Bounds, point } from "tactic-geometry";
import { absolutizeBounds, ITacticIconCaptionData } from "@tmc/icon-util";

const getBoundsOFElement = (svg: Element) => {
    const rect = svg.getBoundingClientRect();
    return new Bounds([rect.x, rect.y], [rect.x + rect.width, rect.y + rect.height]);
}

const getBounds = (svg: Element) => {
    const calculatedBounds = getBoundsOFElement(svg);
    let subbling: Element | null = svg.nextElementSibling;
    while (subbling) {
        const currBounds = getBoundsOFElement(subbling);
        calculatedBounds.extend(currBounds.min);
        calculatedBounds.extend(currBounds.max);
        subbling = subbling.nextElementSibling;
    }

    return calculatedBounds;
}

export const useSvgCaptionPosition = (svg: SVGSVGElement, data: ITacticIconCaptionData | undefined): Bounds | undefined => {
    const [position, setPosition] = useState<Bounds | undefined>(undefined);
    useEffect(() => {
        setPosition(undefined);
        setTimeout(() => {
            if (!data) {
                return;
            }
            const parentPos = getBounds(svg);
            const svgParentPositionSrc = getBounds(svg.firstElementChild!);
            const svgParentPosition = new Bounds(svgParentPositionSrc.min.subtract(parentPos.min), svgParentPositionSrc.max.subtract(parentPos.min));
            const boundingClientRect = absolutizeBounds(
                new Bounds(data.min, data.max),
                svgParentPosition
            );
            const start = parentPos.getSize().divideBy(2).add(point(boundingClientRect.min.x, boundingClientRect.min.y));
            const size = boundingClientRect.getSize();
            setPosition(new Bounds(start, start.add(point(size.x, size.y))));
        }, 300);
    }, [svg, data]);

    return position;
};
