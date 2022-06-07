import { forwardRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { ListItem, LinearProgress, Button, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';

export const ButtonLink = (props) => {
    const link = forwardRef((itemProps, ref) => (
        <Link ref={ref} to={props.to} {...itemProps} />
    ));

    return <Button component={link} {...props}>
        {props.children}
    </Button>
}

export const IconButtonLink = (props) => {
    const link = forwardRef((itemProps, ref) => (
        <Link ref={ref} to={props.to} {...itemProps} />
    ));

    return <IconButton component={link} {...props}>
        {props.children}
    </IconButton>
}

export const ListLinkComposition = (props) => {
    const link = forwardRef((itemProps, ref) => (
        <Link ref={ref} to={props.to} {...itemProps} />
    ));

    return <ListItem button component={link} {...props}>
        {props.children}
    </ListItem>
}

export const RequireAuth = ({children, isAuthenticated}) => {
    const location = useLocation();
    console.log(isAuthenticated)

    if (isAuthenticated === null) {
        return <LinearProgress />
    }

    if (isAuthenticated === false) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
};
