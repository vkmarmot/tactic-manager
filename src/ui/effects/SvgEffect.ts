import {RefObject, useEffect} from "react";
import { removeChildren } from "../util/DomUtil";

export const useAppendChild = (ref: RefObject<Element>, svg: Element | false | null | undefined) => {
    useEffect(() => {
        if (ref.current) {
            if (svg) {
                ref.current.append(svg);
            }
        }
        return () => {
            if (ref.current) {
                removeChildren(ref.current);
            }
        };
    }, [svg]);

};
