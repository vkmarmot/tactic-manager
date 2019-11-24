import React, { useEffect, useRef, useState } from "react";
import ImageIcon from "@material-ui/icons/Image";
import BrokenImageIcon from "@material-ui/icons/BrokenImage";
import { fileAsBase64 } from "../../util/FIleUtil";

interface IPreviewPops {
    file: File;
    width?: string;
    height?: string;
}

export const Preview = ({ file, height = "100%", width = "100%" }: IPreviewPops) => {
    const [loaded, setLoaded] = useState<false | string>(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        let aborted = false;
        setLoaded(false);
        setError(false);
        fileAsBase64(file).then(
            (content) => {
                if (!aborted) {
                    setLoaded(content);
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
    return (
        <div>
            {loaded ? undefined : <ImageIcon />}
            {loaded ? <img style={{ width, height }} src={loaded} /> : undefined}
            {error ? <BrokenImageIcon /> : undefined}
        </div>
    );
};
