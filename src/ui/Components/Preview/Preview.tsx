import React, { useEffect, useRef, useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import { contentToSvg, ITacticIcon } from "@tmc/icon-util";

import { fitSvgViewboxToChild } from "../../util/SvgUtil";
import { appendChildEffect } from "../../effects/SvgEffect";
import classes from "./Preview.scss";

interface IPreviewPops {
    file: ITacticIcon;
    width?: string;
    height?: string;
}

export const Preview = ({ file, height = "100%", width = "100%" }: IPreviewPops) => {
    const [loaded, setLoaded] = useState<false | SVGSVGElement>(false);
    const [error, setError] = useState<string | false>(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let aborted = false;
        setLoaded(false);
        setError(false);
        Promise.resolve(file.svg())
            .then(contentToSvg)
            .then(
                (content) => {
                    if (!aborted) {
                        if (content) {
                            setLoaded(fitSvgViewboxToChild(content));
                        } else {
                            setError("Svg not loaded");
                        }
                        // console.log(content.toString("base64"));
                        // setLoaded(content.toString("base64"));
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
    useEffect(appendChildEffect(ref, loaded), [loaded]);
    return (
        <div className={classes.preview}>
            {loaded ? undefined : <ImageIcon />}
            {loaded ? <div style={{ width: "100%", height: "100%" }} ref={ref} /> : undefined}
            {error ? <BrokenImageIcon /> : undefined}
        </div>
    );
};
