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

import { Button } from '@mui/material';
import { useUi } from '~/features/ui';
import { Divider } from './Common';

const Close = () => {
  const { toggleShowConfig } = useUi();
  return (
    <>
      <Button
        variant='text'
        color='secondary'
        onClick={() => toggleShowConfig()}
      >
        Retour au plateau
      </Button>
      <Divider />
    </>
  );
};

export default Close;
