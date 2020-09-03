import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useButtonStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: { margin: theme.spacing(1) },
        input: { display: "none" }
    })
);

