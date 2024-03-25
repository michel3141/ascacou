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
