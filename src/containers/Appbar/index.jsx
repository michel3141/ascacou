import Menu from './Menu';

import './Appbar.scss';

import titre from '~assets/img/titre-t.png';
import Regles from './Drawer/Regles';
import Config from './Drawer/Config';
import Victoire from './Drawer/Victoire';

import FullscreenIcon from './Button/Fullscreen';
import ReglesIcon from './Button/Regles';
import ConfigIcon from './Button/Config';

const Bar = () => {
  const drawers = [<Regles key={1} />, <Config key={2} />, <Victoire key={3} />];
  const left = [<ConfigIcon key={1} />, <ReglesIcon key={2} />];
  const right = [<FullscreenIcon key={1} />];
  return (
    <Menu
      {...{ left, right, drawers }}
      titre={
        <img
          className='Title'
          src={titre}
          onMouseDown={(e) => e.preventDefault()}
        />
      }
    />
  );
};

export default Bar;
