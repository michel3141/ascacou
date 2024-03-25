/**
 *     ascacou - A 1 vs 1 strategy game ( created by Marc Buonomo )
 *     Copyright (C) 2024  michel3141
 *
 *     This program is free software: you can redistribute it and/or modify
 *     it under the terms of the GNU General Public License as published by
 *     the Free Software Foundation, either version 3 of the License, or
 *     (at your option) any later version.
 *
 *     This program is distributed in the hope that it will be useful,
 *     but WITHOUT ANY WARRANTY; without even the implied warranty of
 *     MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *     GNU General Public License for more details.
 *
 *     You should have received a copy of the GNU General Public License
 *     along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
            url:
              window.location.origin +
              window.location.pathname +
              '?' +
              urlParams,
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
