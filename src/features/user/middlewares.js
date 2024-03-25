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

import { addListener /* , {set, update} */ } from 'rtk';

/*
 * constants
 */
import { name } from './constants';

/*
 * actions
 */
import { find, create, refresh, update } from './actions';
import { findByName } from '~/features/app/actions';

/*
 * selectors
 */
import { selectChannel, selectChannelIdentifier } from './selectors';
import { selectChannelConsumer } from '~/features/connection/selectors';

/*
 * imports
 */
import { perform, subscribe } from '~/features/connection/TODO-actioncable';

/* ************************ */

import { setItem, getItem } from 'localStorage';
const persist = (obj) => {
  const [key, value] = Object.entries(obj).at(0);
  setItem(`${name}/${key}`, value);
};
const loadItem = (key) => getItem(`${name}/${key}`);

// GRAPH user:find > user:1
// GRAPH user:create > user:1
addListener(
  [find.fulfilled, create.fulfilled],
  ({ payload }, { dispatch, getState }) => persist({ id: payload.id }),
);

// GRAPH game:changed > user:2
addListener(
  [find.fulfilled, create.fulfilled, refresh.fulfilled, update.fulfilled],
  ({ payload }, { dispatch, getState }) => persist({ name: payload.name }),
);

// GRAPH user:find > user:3
// GRAPH user:3 < user:create
addListener(
  find.rejected,
  async ({ type, payload }, { dispatch, getState }) => {
    persist({ id: null });
    const name = (await loadItem('name')) || 'Joueur inconnu';
    dispatch(create({ name }));
  },
);

// GRAPH app:findByName > user:4
// GRAPH user:4 < user:find
// GRAPH user:4 < user:create
addListener(
  findByName.fulfilled,
  async ({ type, payload }, { dispatch, getState }) => {
    const id = await loadItem('id');
    if (id) {
      dispatch(find(id));
    } else {
      dispatch(create({ name: 'Nouveau joueur' }));
    }
  },
);

addListener(
  [find.fulfilled, create.fulfilled],
  ({ payload }, { dispatch, getState }) => {
    const consumer = selectChannelConsumer(getState());
    const identifier = selectChannelIdentifier(getState());
    subscribe(
      // subscribe is cached
      consumer,
      identifier,
      {
        update: perform(),
        on_connected: function () {},
      },
    );
  },
);

addListener(update.fulfilled, ({ payload }, { dispatch, getState }) => {
  const user = payload;
  const channel = selectChannel(getState());

  channel?.update({
    user,
  });
});
