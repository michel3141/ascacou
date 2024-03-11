import { Suspense } from 'react';
import { Drawer as MuiDrawer, IconButton as MuiIconButton } from '@mui/material';
import { useUi } from '~/features/ui';

import { useFullscreen } from 'fullscreen-slice';
const Drawer = ({ children, drawerId, ...params }) => {
  const { useDrawer, toggleDrawer } = useUi();
  const activeDrawer = useDrawer();

  const { useIsFullscreen } = useFullscreen();
  const isFullscreen = useIsFullscreen();
  const container = isFullscreen ? document.getElementById('fullscreen-app') : null;
  return (
    <Suspense>
      <MuiDrawer
        open={activeDrawer === drawerId}
        onClose={() => toggleDrawer(drawerId, false)}
        anchor='left'
        {...params}
        {...{ container }}
      >
        {children}
      </MuiDrawer>
    </Suspense>
  );
};

const IconButton = ({ children, drawerId, ...params }) => {
  const { toggleDrawer } = useUi();
  return (
    <MuiIconButton
      onClick={() => toggleDrawer(drawerId)}
      color='inherit'
      {...params}
    >
      {children}
    </MuiIconButton>
  );
};

export { Drawer, IconButton };
