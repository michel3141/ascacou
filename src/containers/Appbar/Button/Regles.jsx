import Icon from '@mui/icons-material/Help';
import { IconButton } from '../Custom';
import { RULES as drawerId } from '~/features/ui/constants';

const ReglesIcon = () => (
  <IconButton
    {...{ drawerId }}
    title='Règles'
  >
    <Icon />
  </IconButton>
);

export default ReglesIcon;
