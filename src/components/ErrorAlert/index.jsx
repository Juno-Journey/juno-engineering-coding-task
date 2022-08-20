import React from 'react';
import { makeStyles } from '@mui/styles';
import { Alert, AlertTitle } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  error: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    }
  },
}));


export default function ErrorAlert({ message }) {
  const classes = useStyles();
  return (
    <div className={classes.error}>
      <Alert severity="error" elevation={6} variant="filled">
        <AlertTitle>Error</AlertTitle>
        {message ? <strong>{message}</strong> : <strong>check which error</strong>}
      </Alert>
    </div>
  );
}


