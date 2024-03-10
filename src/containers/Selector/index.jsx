import React from 'react';
import { Grid } from '@mui/material';
import './Selector.scss';

import { useApp } from '~/features/app';
import { useGame } from '~/features/game';
import { useSelection } from '~/features/selection';
import { useUser } from '~/features/user';
import { useViewport } from 'viewport-slice';
import { LANDSCAPE } from 'viewport-slice/constants';

import mkClasses from '~/lib/mkClasses';

import { WHITE, BLACK } from '~/features/game/constants';
import noirs from '~assets/img/noirs.png';
import blancs from '~assets/img/blancs.png';

export default function Selector () {
  const { useIsRunning } = useGame();
  const { useIsMyTurn } = useUser();
  const isRunning = useIsRunning();
  const isMyTurn = useIsMyTurn();
  return (
    <Grided disabled={!isRunning || !isMyTurn}>
      <Option color={BLACK} />
      <Option color={WHITE} />
    </Grided>
  );
}

const Grided = ({ children, disabled }) => {
  const { useOrientation } = useViewport();
  const orientation = useOrientation();
  const className = mkClasses('Selector', { disabled });
  return (
    <Grid
      {...{ className }}
      container
      direction='row'
      justify='space-evenly'
      alignItems='flex-start'
    >
      {children.map((child, id) => (
        <Grid
          item
          xs={orientation === LANDSCAPE ? 6 : 12}
          key={id}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

const OneGrided = ({ children }) => (
  <Grid
    className='Selector'
    container
    direction='row'
    justify='space-evenly'
    alignItems='flex-start'
  >
    <Grid
      item
      xs={12}
    >
      {children}
    </Grid>
  </Grid>
);
export const BlackSelector = () => (
  <OneGrided>
    <Option color={BLACK} />
  </OneGrided>
);

export const WhiteSelector = () => (
  <OneGrided>
    <Option color={WHITE} />
  </OneGrided>
);

const Option = ({ color }) => {
  const { selectColor } = useApp();
  const { useSelected } = useSelection();
  const { color: currentColor } = useSelected();
  const className = mkClasses({ Selected: color === currentColor });
  const src = {
    [BLACK]: noirs,
    [WHITE]: blancs,
  }[color];
  return (
    <div
      {...{ className }}
      onMouseDown={() => selectColor(color)}
    >
      <img
        {...{ src }}
        onMouseDown={(e) => e.preventDefault() /* no-drag */}
      />
    </div>
  );
};
