import React, { useState, useEffect } from 'react'

import { useCurrentConfigSlice } from '/app/slices'

import { Grid, Button, Switch, List, ListItem, Typography, FormControlLabel } from '@mui/material'
import '/css/Config.css'

export default function Config({ onApply }) {
  return (
    <div className='Config'>
      <Grid
        container
        direction='column'
        justify='space-evenly'
        alignItems='center'
      >
        <p style={{ textAlign: 'center' }}>
          <img src='img/icon_128.png' />
        </p>
        <CurrentConfig />
        <Divider />
        <NewGame {...{ onApply }} />
      </Grid>
    </div>
  )
}

const CurrentConfig = () => {
  const { useCurrentConfig, updateValue } = useCurrentConfigSlice()
  const currentConfig = useCurrentConfig()
  return (
    <>
      <Typography variant='h4'>Partie en cours</Typography>
      {Object.entries(currentConfig).map(([key, item]) => (
        <Item {...{ key, item, id: key, updateValue }} />
      ))}
    </>
  )
}

const NewGame = ({ onApply }) => {
  const { useCurrentConfig } = useCurrentConfigSlice()
  const currentConfig = useCurrentConfig()

  const [params, setParams] = useState(currentConfig)
  const updateValue = (changes = {}) => {
    const current = Object.entries(params).reduce(
      (acc, [key, item]) => ({ ...acc, [key]: item.value }),
      {}
    )
    changes = { ...current, ...changes }
    Object.entries(changes).forEach(([key, value]) =>
      setParams(p => {
        let enable = true
        if (['show_blocked', 'show_forbidden'].includes(key)) {
          enable = !changes.allow_multiple_cards
        }
        return {
          ...p,
          [key]: { ...p[key], enable, value },
        }
      })
    )
  }
  useEffect(updateValue, [])

  const submit = () => {
    const current = Object.entries(params).reduce(
      (acc, [key, item]) => ({ ...acc, [key]: item.value }),
      {}
    )
    onApply(current)
  }

  return (
    <>
      <Typography variant='h4'>Nouvelle partie</Typography>
      {Object.entries(params).map(([key, item]) => (
        <Item {...{ key, item: { ...item }, id: key, updateValue }} />
      ))}
      <Button
        variant='contained'
        color='primary'
        onClick={submit}
      >
        Commencer
      </Button>
    </>
  )
}
const Item = ({ id, item, updateValue }) => {
  const { enable, value, lbl, type, values } = item
  switch (type) {
    case 'boolean':
      return <OnOff {...{ id, value, enable, lbl, updateValue }} />
    case 'enum':
      return <Select {...{ id, value, enable, lbl, values, updateValue }} />
    default:
      return <div>null</div>
  }
}
const OnOff = ({ id, value, enable, lbl, updateValue }) => (
  <div>
    <FormControlLabel
      disabled={!enable}
      value='start'
      control={
        <Switch
          checked={value}
          onClick={() => updateValue({ [id]: !value })}
        />
      }
      label={lbl}
      labelPlacement='start'
    />
  </div>
)

const Select = ({ id, value, enable, lbl, values, updateValue }) => (
  <fieldset disabled={!enable}>
    <legend>{lbl}</legend>
    <List>
      {Object.keys(values)
        .filter(key => enable || key === value)
        .map(key => (
          <ListItem
            key={key}
            button
            onClick={() => updateValue({ [id]: key })}
            selected={key === value}
          >
            {values[key].lbl}
          </ListItem>
        ))}
    </List>
  </fieldset>
)

const Divider = () => (
  <hr
    style={{
      border: 'none',
      height: 1,
      margin: 20,
      width: '80%',
      backgroundColor: '#333',
    }}
  />
)
