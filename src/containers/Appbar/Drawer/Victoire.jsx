import { lazy } from 'react';
import { Drawer } from '../Custom';
import { VICTORY as drawerId } from '~/features/ui/constants';

const Victoire = lazy(() => import('~/containers/Victoire'));
const VictoireDrawer = () => {
  return (
    <Drawer
      {...{ drawerId }}
      anchor='top'
      PaperProps={{
        sx: { left: '25%', width: '50%', height: '80%' },
      }}
    >
      <Victoire />
    </Drawer>
  );
};

export const VictoireIcon = () => null;
export default VictoireDrawer;
