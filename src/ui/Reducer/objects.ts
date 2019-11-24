export interface IObjectsSetFiles {
    type: "objects:set-files";
    files: string[];
}

export interface IObjectsSetSelected {
    type: "objects:set-selected";
    selected: number;
}

export interface IObjectStore {
    files: string[];
    selected: number;
}

const DEFAULT_STORE = { files: [], selected: -1 };

export const objects = (
    store: IObjectStore = DEFAULT_STORE,
    action: IObjectsSetFiles | IObjectsSetSelected
): IObjectStore => {
    switch (action.type) {
        case "objects:set-selected":
            return { ...store, selected: action.selected };
        case "objects:set-files":
            return { ...store, files: action.files };
        default:
            return store;
    }
};
