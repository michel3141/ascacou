import { lazy } from 'react';
import { Drawer } from '../Custom';
import { RULES as drawerId } from '~/features/ui/constants';

const Regles = lazy(() => import('~/containers/Regles'));
const ReglesDrawer = () => {
  return (
    <Drawer {...{ drawerId }}>
      <Regles />
    </Drawer>
  );
};

export default ReglesDrawer;
