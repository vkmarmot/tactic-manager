/* tslint:disable */
declare module "*.scss" {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}
declare module "*.gif" {
    const classNames: string;
    export = classNames;
}

declare module "*.png" {
    const classNames: string;
    export = classNames;
}
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
