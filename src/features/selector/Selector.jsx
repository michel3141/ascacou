import React from 'react';
import { Grid } from '@mui/material';
import './Selector.scss';

import { useSelectorSlice } from '/app/slices';

import mkClasses from '/lib/mkClasses';

import { EMPTY, WHITE, BLACK } from '/app/constants/colors';
import noirs from '/assets/img/noirs.png';
import blancs from '/assets/img/blancs.png';

export default function Selector() {
  return (
    <Grided>
      <Option color={BLACK} />
      <Option color={WHITE} />
    </Grided>
  );
}

const Grided = ({ children }) => {
  const { useColor } = useSelectorSlice();
  const currentColor = useColor();
  const className = mkClasses('Selector', { Unselected: EMPTY === currentColor });
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
          xs
          key={id}
        >
          {child}
        </Grid>
      ))}
    </Grid>
  );
};

const Option = ({ color }) => {
  const { select, useColor } = useSelectorSlice();
  const currentColor = useColor();
  const className = mkClasses({ Selected: color === currentColor });
  const src = {
    [BLACK]: noirs,
    [WHITE]: blancs,
  }[color];
  return (
    <div
      {...{ className }}
      onMouseDown={() => select(color)}
    >
      <img
        {...{ src }}
        onMouseDown={(e) => e.preventDefault() /* no-drag */}
      />
    </div>
  );
};
