
import {ITacticIcon, makeIconListJson, makeIconSvgWithDesc} from "@tmc/icon-util";


const createLegacyIconData = (icon: ITacticIcon) => {
    const svg = makeIconSvgWithDesc(icon);
    svg.setAttribute("width", "900");
    svg.setAttribute("height", "900");
    const name = svg.querySelector("desc name");
    if (name) {
        name.remove();
    }

    const str = svg.outerHTML
        // eslint-disable-next-line no-template-curly-in-string
        .replace(/900/g, "${iconWidth}")
        // eslint-disable-next-line no-template-curly-in-string
        .replace(/rgb\(255, 0, 0\)/g, "${color}")
        .replace(/"/g, "\\\"");

    return `"${icon.meta.id}": {
        svg(color, iconWidth) {
            return \`${str}\`;
        },
        name: ("${icon.meta.name.replace(/"/g, "\\\"")}"),
    }`;
};

// export const saveIconListLegacy = (file: string, list: ITacticIcon[]) => {
//     const result: string[] = [];
//     for (const icon of list) {
//         const svg = createLegacyIconData(icon);
//         result.push(svg);
//     }
//     fs.writeFileSync(
//         file,
//         `export default {
//         ${result.reduce((res, cur) => `${res}${res ? ", " : ""}${cur}`, "")}
//     }`
//     );
// };
//
// export const saveIconList = (file: string, list: ITacticIcon[]) => {
//     fs.writeFileSync(file, makeIconListJson(list));
// };
