import { ITacticIcon } from "@tmc/icon-util";

const findIconIndex = (list: ITacticIcon[], id: string): number => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].meta.id === id) {
            return i;
        }
    }

    return -1;
};

export const mergeIconList = (list: ITacticIcon[], newData: ITacticIcon[]): ITacticIcon[] => {
    const newList = list.slice();
    for (let i = 0; i < newData.length; i++) {
        const element = newData[i];
        const index = findIconIndex(newList, element.meta.id);
        if (index > -1) {
            newList[index] = { ...newList[index], ...element, meta: { ...newList[index].meta, ...element.meta } };
        } else {
            newList.push(element);
        }
    }

    return newList;
};
