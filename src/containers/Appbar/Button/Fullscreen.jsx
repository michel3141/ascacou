import { IconButton } from '../Custom';
import FullscreenEnterIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { useFullscreen } from 'fullscreen-slice';

const FullscreenIcon = () => {
  const { useFullscreenEnabled, toggle, useIsFullscreen } = useFullscreen();
  const isFullscreen = useIsFullscreen();
  const fullscreenEnabled = useFullscreenEnabled();
  return (
    <IconButton
      disabled={!fullscreenEnabled}
      onClick={() => toggle('fullscreen-app')}
      title={isFullscreen ? 'Quitter le plein écran' : 'Mode plein écran'}
    >
      {isFullscreen ? <FullscreenExitIcon /> : <FullscreenEnterIcon />}
    </IconButton>
  );
};

export default FullscreenIcon;
