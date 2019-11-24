import { point as asPoint, bounds as asBounds, Bounds } from "tactic-geometry";


export const getNodeSize = (child: ChildNode): Bounds | undefined => {
    const childBox = child as SVGGElement;
    if (childBox.getBBox) {
        const bBox = childBox.getBBox();
        const tl = asPoint(bBox.x, bBox.y);
        const sw = childBox.getAttribute("stroke-width");
        const ext = sw ? asPoint(parseInt(sw, 10), parseInt(sw, 10)) : asPoint(0, 0);
        const attribute = childBox.getAttribute("transform");
        let offset = asPoint(0, 0);
        if (attribute) {
            const split = attribute.split(/[\(\),]/);
            if (split[0] === "translate") {
                offset = asPoint(parseFloat(split[1]), parseFloat(split[2]));
                tl._add(offset);
            }
        }
        const bounds = asBounds(tl.subtract(ext), tl.add(asPoint(bBox.width, bBox.height)._add(ext)));
        if (child.hasChildNodes()) {
            let node = child.firstChild;
            if (node) {
                let nextNode;
                do {
                    nextNode = node.nextSibling;
                    const size = getNodeSize(node);
                    if (size) {
                        bounds.extend(size.min.add(offset)).extend(size.max.add(offset));
                    }
                    node = nextNode;
                } while (node);
            }
        }
        return bounds;
    }
    return undefined;
};

const container = document.createElement("div");
container.style.position = "absolute";
container.style.top = "-4000px";

export const getSvgChildrenBox = (svg: SVGSVGElement): Bounds | undefined => {
    document.body.appendChild(container);
    container.appendChild(svg);
    let node = svg.firstElementChild;
    let bounds: Bounds | undefined;
    do {
        const nextNode = node && node.nextElementSibling;
        const size = node && getNodeSize(node);
        if (size) {
            bounds = bounds ? bounds.extend(size.min).extend(size.max) : size;
        }
        node = nextNode;
    } while (node);

    svg.remove();
    container.remove();
    return bounds;
};

export const fitSvgViewboxToChild = (svg: SVGSVGElement): SVGSVGElement => {
    const box = getSvgChildrenBox(svg);
    if (box) {
        const { x, y } = box.getSize();
        svg.setAttribute("viewBox", `${box.min.x} ${box.min.y} ${x} ${y}`);
    }
    return svg;
};
