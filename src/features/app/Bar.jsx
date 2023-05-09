import React from 'react'

import { AppBar } from '@mui/material'
import { useAppSlice, useParamsSlice } from '/app/slices'
import Config from '/features/params/Config'
import Menu from './Menu'
import Regles from './Regles'

import { Help, Menu as MenuIcn } from '@mui/icons-material'

const Bar = ({ actions }) => {
  const { useShowRules, useShowConfig, toggleShowRules, toggleShowConfig } = useAppSlice()
  const [showRules, showConfig] = [useShowRules(), useShowConfig()]
  const { newGame } = useParamsSlice()
  return (
    <AppBar
      position='static'
      color='transparent'
    >
      <Menu
        actions={actions.map(action => ({
          ...action,
          cmd: () => onAction(action.cmd),
          long: () => newGame({}),
        }))}
        drawers={[
          {
            title: 'Règles',
            lbl: <Help />,
            action: <Regles />,
            visible: showRules,
            enable: true,
            onToggle: toggleShowRules,
          },
          {
            title: 'Nouvelle partie',
            lbl: <MenuIcn />,
            action: <Config />,
            visible: showConfig,
            enable: true,
            onToggle: toggleShowConfig,
          },
        ]}
        titre={
          <img
            src='/assets/img/titre-t.png'
            onMouseDown={e => e.preventDefault()}
          />
        }
      />
    </AppBar>
  )
}

export default Bar
