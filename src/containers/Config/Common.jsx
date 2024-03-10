import React from 'react';
import { Switch, List, ListItem, FormControlLabel, ButtonGroup, Button } from '@mui/material';
import { useGame } from '~/features/game';
import { useApp } from '~/features/app';

const Param = ({ param, updateParam }) => {
  const { dataType, name } = param;
  switch (name) {
    case 'deal_method':
      return <DealMethod {...{ param, updateParam }} />;
    case 'allow_multiple_cards':
      return <AllowMultipleCards {...{ param, updateParam }} />;
  }
  switch (dataType) {
    case 'BOOLEAN':
      return <OnOff {...{ param, updateParam }} />;
    case 'ENUM':
      return <Select {...{ param, updateParam }} />;
    default:
      return (
        <div>
          unkwon dataType &apos;{dataType}&apos; for param &apos;{param.name}
          &apos;
        </div>
      );
  }
};

const OnOff = ({ param, updateParam }) => {
  const { name, enable, value, description } = param;
  return (
    enable && (
      <div>
        <FormControlLabel
          name={name}
          disabled={!enable}
          value='start'
          control={
            <Switch
              checked={value}
              onClick={() => updateParam({ ...param, value: !value })}
            />
          }
          label={description}
          labelPlacement='start'
        />
      </div>
    )
  );
};

const Select = ({ param, updateParam }) => {
  const { value, enable, description, values } = param;
  return (
    <fieldset>
      <legend>{description}</legend>
      <List>
        {values
          .filter((item) => enable || item.value === value)
          .map((item) => (
            <ListItem
              disabled={!enable}
              key={item.value}
              button
              onClick={() => updateParam({ ...param, value: item.value })}
              selected={item.value === value}
            >
              {item.description}
            </ListItem>
          ))}
      </List>
    </fieldset>
  );
};

const Divider = () => (
  <hr
    style={{
      border: 'none',
      height: 1,
      margin: 10,
      width: '80%',
      backgroundColor: '#333',
    }}
  />
);

const DealMethod = ({ param }) => {
  const { useIsFirstTurn } = useGame();
  const isFirstTurn = useIsFirstTurn();

  const { startGame } = useApp();
  const deal = (value) => startGame([{ name: 'deal_method', value }]);
  const { description, value, values } = param;
  return (
    <fieldset>
      <legend>{isFirstTurn ? 'Redistribue les cartes' : description}</legend>
      <ButtonGroup orientation='vertical'>
        {values
          .filter((item) => isFirstTurn || item.value === value)
          .map((item) => (
            <Button
              key={item.value}
              variant={
                isFirstTurn ? (item.value === value ? 'contained' : 'outlined') : 'contained'
              }
              color='primary'
              onClick={() => deal(item.value)}
              disabled={!isFirstTurn}
            >
              {item.description}
            </Button>
          ))}
      </ButtonGroup>
    </fieldset>
  );
};

const AllowMultipleCards = ({ param, updateParam }) => {
  const { useIsFirstTurn } = useGame();
  const isFirstTurn = useIsFirstTurn();
  const { description, value } = param;
  return (
    <div>
      {isFirstTurn ? (
        <FormControlLabel
          name={name}
          value='start'
          control={
            <Switch
              checked={value}
              onClick={() => updateParam({ ...param, value: !value })}
            />
          }
          label={description}
          labelPlacement='start'
        />
      ) : (
        <span>{value ? "Vous jouez la variante 'sans blocage'" : null}</span>
      )}
    </div>
  );
};

export { Param, Divider };
