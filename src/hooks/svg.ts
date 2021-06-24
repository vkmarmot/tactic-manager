import {useEffect, useState} from "react";
import {contentToSvg} from "@tmc/icon-util";

export const useSvgRef = (svg: string): [false | SVGSVGElement, string] => {
    const [fileContent, setFileContent] = useState<false | SVGSVGElement>(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setFileContent(false);
        setError("");
        let aborted = false;

        Promise.resolve(svg)
            .then(contentToSvg)
            .then(
                (svgInstance) => {
                    if (!aborted) {
                        if (svgInstance) {
                            setFileContent(svgInstance);
                        }
                    }
                },
                (e) => {
                    if (!aborted) {
                        setError(e.message);
                    }
                }
            );
        return () => {
            aborted = true;
        };
    }, [svg]);

    return [fileContent, error];
}
