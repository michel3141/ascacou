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

import { useMemo, useRef, useCallback } from 'react';
const nullFunc = () => null;
const useLongPress = ({
  onClick = nullFunc,
  onLongPress = nullFunc,
  ms = 500,
} = {}) => {
  const timerRef = useRef(false);
  const eventRef = useRef({});

  const callback = useCallback(() => {
    onLongPress(eventRef.current);
    eventRef.current = {};
    timerRef.current = false;
  }, [onLongPress]);

  const start = useCallback(
    (ev) => {
      ev.persist();
      eventRef.current = ev;
      timerRef.current = setTimeout(() => {
        timerRef.current = false;
        eventRef.current = {};
        callback(ev);
      }, ms);
    },
    [callback, ms],
  );

  const stop = useCallback((ev) => {
    ev.persist();
    eventRef.current = ev;
    clearTimeout(timerRef.current);
    timerRef.current = false;
    eventRef.current = {};
  }, []);

  const click = useCallback(
    (ev) => {
      if (timerRef.current) {
        try {
          onClick(ev);
        } finally {
          stop(ev);
        }
      }
    },
    [onClick, stop],
  );

  return useMemo(
    () => ({
      onMouseDown: start,
      onMouseUp: click,
      onMouseLeave: stop,
      onTouchStart: start,
      onTouchEnd: click,
    }),
    [start, stop, click],
  );
};

export { useLongPress };
