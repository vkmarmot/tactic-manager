import React from "react";
import MenuIcon from "@material-ui/icons/Menu";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton/IconButton";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link as RouterLink,
    LinkProps as RouterLinkProps
} from "react-router-dom";
import ObjectsActivity from "./ObjectsActivity/ObjectsActivity";

const drawerWidth = 0;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: { display: "flex", height: "100%" },
        drawer: {
            [theme.breakpoints.up("sm")]: {
                width: drawerWidth,
                flexShrink: 0
            },
            display: "flex",
            flexDirection: "column"
        },
        appBar: {
            [theme.breakpoints.up("sm")]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth
            }
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up("sm")]: { display: "none" }
        },
        toolbar: theme.mixins.toolbar,
        drawerPaper: { width: drawerWidth },
        content: {
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(3)
        }
    })
);
interface ListItemLinkProps {
    icon?: React.ReactElement;
    onClick?(): void;
    children: string;
    to: string;
}

function ListItemLink(props: ListItemLinkProps) {
    const { icon, children, onClick, to } = props;

    const renderLink = React.useMemo(
        () =>
            React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "innerRef" | "to">>((itemProps, ref) => (
                // With react-router-dom@^6.0.0 use `ref` instead of `innerRef`
                // See https://github.com/ReactTraining/react-router/issues/6056
                // eslint-disable-next-line react/jsx-props-no-spreading
                <RouterLink to={to} {...itemProps} innerRef={ref} />
            )),
        [to]
    );

    return (
        <li>
            <ListItem button onClick={onClick} component={renderLink}>
                <ListItemText primary={children} />
            </ListItem>
        </li>
    );
}

export const Application = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            {/* <Divider />
            <List>
                <ListItemLink to="/">Control Panel</ListItemLink>
                <ListItemLink to="/object-editor">Object Editor</ListItemLink>
            </List> */}
        </div>
    );

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Switch>
                            <Route path="/">
                                <Typography variant="h6" noWrap>
                                    Object Editor
                                </Typography>
                            </Route>
                        </Switch>
                    </Toolbar>
                </AppBar>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path="/">
                            <ObjectsActivity />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
};
