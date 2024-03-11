import Icon from '@mui/icons-material/Menu';
import { IconButton } from '../Custom';
import { CONFIG as drawerId } from '~/features/ui/constants';

const ConfigIcon = () => (
  <IconButton
    {...{ drawerId }}
    title='Configuration'
  >
    <Icon />
  </IconButton>
);

export default ConfigIcon;
