export const removeChildren = (element: Element) => {
    while (element.firstChild) {
        element.firstChild.remove();
    }
};
