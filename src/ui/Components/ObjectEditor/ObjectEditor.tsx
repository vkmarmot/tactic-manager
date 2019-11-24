import React, { useEffect, useRef, useState } from "react";
import { contentToSvg, fileAsText } from "../../util/FIleUtil";
import {Bounds} from "tactic-geometry";
import {fitSvgViewboxToChild} from "../../util/SvgUtil";

interface IObjectEditorProps {
    file: File;
}

export const ObjectEditor = ({ file }: IObjectEditorProps) => {
    const [fileContent, setFileContent] = useState<false | SVGSVGElement>(false);
    const [error, setError] = useState("");
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        setFileContent(false);
        setError("");
        let aborted = false;

        fileAsText(file)
            .then(contentToSvg)
            .then(
                (svg) => {
                    if (!aborted) {
                        if (svg) {
                            svg.removeAttribute("viewBox");
                            setFileContent(svg);
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
    }, [file]);
    useEffect(() => {
        if (ref.current) {
            if (fileContent) {
                ref.current.appendChild(fitSvgViewboxToChild(fileContent));
            }
        }
        return () => {
            if (ref.current) {
                while (ref.current.firstChild) {
                    ref.current.firstChild.remove();
                }
            }
        };
    }, [fileContent]);
    return (
        <div>
            {!fileContent && !error ? <div>Loading..</div> : undefined}
            {fileContent ? <div ref={ref} /> : undefined}
            {error ? <div>{error}</div> : undefined}
        </div>
    );
};
