import { Button } from '@mui/material';
import { useUi } from '~/features/ui';
import { Divider } from './Common';

const Close = () => {
  const { toggleShowConfig } = useUi();
  return (
    <>
      <Button
        variant='text'
        color='primary'
        onClick={() => toggleShowConfig()}
      >
        Retour au plateau
      </Button>
      <Divider />
    </>
  );
};

export default Close;
