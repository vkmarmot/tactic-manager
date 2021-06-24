import React, { useEffect, useRef } from "react";
import { useSvgRef } from "../../../hooks/svg";
import { appendChildEffect } from "../../effects/SvgEffect";

export const SvgView = React.memo(({ svg, className }: { svg: string; className?: string }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [fileContent, error] = useSvgRef(svg);
    useEffect(appendChildEffect(ref, fileContent), [fileContent]);
    return (
        <div className={className}> {!fileContent && !error ? <div>Loading..</div> : undefined}
            {fileContent ? <div ref={ref} /> : undefined}
            {error ? <div>{error}</div> : undefined}
        </div>
    );
});
