import { encode } from '~/app/aaa';
import { useGame } from '~/features/game';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';

const Share = ({ prefix }) => {
  const { useId } = useGame();
  const gameId = useId();
  return (
    <>
      <span>{prefix}</span>
      <input
        style={{
          borderRadius: 5,
          textAlign: 'center',
        }}
        value={encode(gameId)}
        readOnly
      />
      <ShareButton />
    </>
  );
};

const ShareButton = ({ gameId }) => {
  if (navigator.share) {
    return <ShareWith />;
  }
  if (navigator.clipboard) {
    return <ShareWithClipboard />;
  }
  return null;
};

const ShareWith = () => {
  const { useId } = useGame();
  const gameId = useId();
  const urlParams = new URLSearchParams({ gameId: encode(gameId, true) });
  return (
    <IconButton
      onClick={
        () =>
          navigator.share({
            title: document.title,
            text: 'Rejoins moi sur ascacou',
            url: window.location.origin + window.location.pathname + '?' + urlParams,
          }) /* promise */
      }
      color='inherit'
      title='Partager la table'
      size='small'
    >
      <ShareIcon />
    </IconButton>
  );
};
const ShareWithClipboard = () => {
  const { useId } = useGame();
  const gameId = useId();
  return (
    <IconButton
      onClick={() => navigator.clipboard.writeText(encode(gameId))}
      color='inherit'
      title='Copier le nom'
      size='small'
    >
      <ContentCopyIcon />
    </IconButton>
  );
};

export default Share;
