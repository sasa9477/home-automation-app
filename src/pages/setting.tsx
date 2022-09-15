import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Box, Card, Fab, Fade, Stack, Toolbar } from '@mui/material';
import { Switcher } from '@prisma/client';
import React, { useCallback, useEffect } from 'react';
import { useToggle } from 'react-use';

import FunctionSwitchSettingCard, { RefFunctionSwitchSettingCard } from '../components/FunctionSwitchSettingCard';

import type { GetServerSideProps, NextPage } from 'next'

type SettingPageProps = {
  switchers: Switcher[]
}

export const getServerSideProps: GetServerSideProps<SettingPageProps> = async (context) => {
  const switchers: Switcher[] = [{
    id: 1,
    name: "hoge",
    ipaddress: "192.168.1.1",
    enabled: true
  },
  {
    id: 2,
    name: "fuga",
    ipaddress: "192.168.1.2",
    enabled: false
  },
  {
    id: 3,
    name: "piyo",
    ipaddress: "192.168.1.3",
    enabled: true
  },
  {
    id: 4,
    name: "zoon",
    ipaddress: "192.168.1.4",
    enabled: true
  }]

  return {
    props: {
      switchers
    }
  }
}

const SettingPage: NextPage<SettingPageProps> = ({ switchers }) => {
  const [showNewCard, toggleShowNewCard] = useToggle(false)

  const onDeleteButtonClick = useCallback((id: number) => {
    console.log(id)
    if (id === 0) {
      toggleShowNewCard()
    }
  }, [toggleShowNewCard])

  useEffect(() => {
    if (showNewCard) {
      window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
    }
  }, [showNewCard])

  return (
    <Stack>
      {switchers.map(switcher => (
        <FunctionSwitchSettingCard
          key={switcher.id}
          inputs={switcher}
          delegate={{
            onDeleteButtonClick
          }}
        />
      ))}
      <Fade in={showNewCard}>
        <RefFunctionSwitchSettingCard
          inputs={{
            id: 0,
            name: '',
            ipaddress: '',
            enabled: true
          }}
          delegate={{
            onDeleteButtonClick
          }}
        />
      </Fade>
      <Fab
        color="primary"
        aria-label="add"
        sx={(theme) => ({
          position: 'fixed',
          right: theme.spacing(6),
          bottom: theme.spacing(8),
          display: showNewCard ? 'none' : 'inherit',
          [theme.breakpoints.up('sm')]: {
            display: 'none',
          }
        })}
        onClick={() => toggleShowNewCard()}>
        {showNewCard ? <ClearIcon /> : <AddIcon />}
      </Fab>
    </Stack>
  )
}

export default SettingPage
