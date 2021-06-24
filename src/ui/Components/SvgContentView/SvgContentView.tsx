import React from "react";
import { useSvgRef } from "../../../hooks/svg";
import TextField from "@material-ui/core/TextField";

export const SvgContentView = React.memo(({ svg, className }: { svg: string; className?: string }) => {
    const [fileContent, error] = useSvgRef(svg);
    return fileContent ? <TextField multiline rows={10} className={className} value={fileContent.outerHTML} /> : null;
});
