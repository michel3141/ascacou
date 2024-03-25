/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import {
  Switch,
  List,
  ListItem,
  FormControlLabel,
  ButtonGroup,
  Button,
} from '@mui/material';
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
          unkwon dataType &apos;{dataType}&apos; for param &apos;
          {param.name}
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
                isFirstTurn
                  ? item.value === value
                    ? 'contained'
                    : 'outlined'
                  : 'contained'
              }
              color={item.value === value ? 'primary' : 'secondary'}
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
