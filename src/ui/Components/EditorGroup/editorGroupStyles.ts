import {createStyles, makeStyles, Theme} from "@material-ui/core";

export const useEditorGroupStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: `${theme.spacing(1)}px 0`,
            width: "100%"
        }
    })
);
