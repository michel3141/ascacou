import { lazy } from 'react';
import { Drawer } from '../Custom';
import { CONFIG as drawerId } from '~/features/ui/constants';

const Config = lazy(() => import('~/containers/Config'));
const ConfigDrawer = () => {
  return (
    <Drawer {...{ drawerId }}>
      <Config />
    </Drawer>
  );
};

export default ConfigDrawer;
