import React, { useState, useEffect } from 'react';

import { useParamsSlice } from '/app/slices';
import icon from '/assets/img/icon_128.png';

import { Grid, Button, Switch, List, ListItem, Typography, FormControlLabel } from '@mui/material';
import './Config.css';

export default function Config() {
  return (
    <div className='Config'>
      <Grid
        container
        direction='column'
        justify='space-evenly'
        alignItems='center'
      >
        <p style={{ textAlign: 'center' }}>
          <img src={icon} />
        </p>
        <Params />
        <Divider />
        <NewGame />
      </Grid>
    </div>
  );
}

const Params = () => {
  const { useParams, updateValue } = useParamsSlice();
  const params = useParams();
  return (
    <>
      <Typography variant='h4'>Partie en cours</Typography>
      {Object.entries(params).map(([key, item]) => (
        <Item
          key={key}
          {...{ item, id: key, updateValue }}
        />
      ))}
    </>
  );
};

const NewGame = () => {
  const { newGame, useParams } = useParamsSlice();

  const [params, setParams] = useState(useParams());
  const config = Object.entries(params).reduce(
    (acc, [key, item]) => ({ ...acc, [key]: item.value }),
    {}
  );
  const updateValue = (changes = {}) => {
    changes = { ...config, ...changes };
    Object.entries(changes).forEach(([key, value]) =>
      setParams((p) => {
        let enable = true;
        if (['show_blocked', 'show_forbidden'].includes(key)) {
          enable = !changes.allow_multiple_cards;
        }
        return {
          ...p,
          [key]: { ...p[key], enable, value },
        };
      })
    );
  };
  useEffect(updateValue, []);

  const submit = () => {
    newGame(config);
  };

  return (
    <>
      <Typography variant='h4'>Nouvelle partie</Typography>
      {Object.entries(params).map(([key, item]) => (
        <Item
          key={key}
          {...{ item: { ...item }, id: key, updateValue }}
        />
      ))}
      <Button
        variant='contained'
        color='primary'
        onClick={submit}
      >
        Commencer
      </Button>
    </>
  );
};
const Item = ({ id, item, updateValue }) => {
  const { enable, value, lbl, type, values } = item;
  switch (type) {
    case 'boolean':
      return <OnOff {...{ id, value, enable, lbl, updateValue }} />;
    case 'enum':
      return <Select {...{ id, value, enable, lbl, values, updateValue }} />;
    default:
      return <div>null</div>;
  }
};
const OnOff = ({ id, value, enable, lbl, updateValue }) => (
  <div>
    <FormControlLabel
      disabled={!enable}
      value='start'
      control={
        <Switch
          checked={value}
          onClick={() => updateValue({ [id]: !value })}
        />
      }
      label={lbl}
      labelPlacement='start'
    />
  </div>
);

const Select = ({ id, value, enable, lbl, values, updateValue }) => (
  <fieldset disabled={!enable}>
    <legend>{lbl}</legend>
    <List>
      {Object.keys(values)
        .filter((key) => enable || key === value)
        .map((key) => (
          <ListItem
            key={key}
            button
            onClick={() => updateValue({ [id]: key })}
            selected={key === value}
          >
            {values[key].lbl}
          </ListItem>
        ))}
    </List>
  </fieldset>
);

const Divider = () => (
  <hr
    style={{
      border: 'none',
      height: 1,
      margin: 20,
      width: '80%',
      backgroundColor: '#333',
    }}
  />
);
