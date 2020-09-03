import { RefObject } from "react";
import { removeChildren } from "../util/DomUtil";

export const appendChildEffect = (ref: RefObject<Element>, svg: Element | false | null | undefined) => () => {
    if (ref.current) {
        if (svg) {
            ref.current.appendChild(svg);
        }
    }
    return () => {
        if (ref.current) {
            removeChildren(ref.current);
        }
    };
};
