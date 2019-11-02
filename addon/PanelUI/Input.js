import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  menu: {
    width: 200,
  },
}));

export default function Input({ value, onChange, label }) {
  const [val, setValue] = React.useState(value);
  const classes = useStyles();

  const onKeyPress = ev => {
    ev.stopPropagation();
    const { key } = ev;
    const v = ev.target.value;
    if (key === 'Enter') {
      ev.preventDefault();
      onChange(v);
    }
  };

  return (
    <form className={classes.container} noValidate autoComplete="off">
      <TextField
        id="outlined-name"
        label={label}
        className={classes.textField}
        value={val}
        onChange={ev => setValue(ev.target.value)}
        onKeyPress={onKeyPress}
        margin="normal"
        variant="outlined"
      />
    </form>
  );
}
