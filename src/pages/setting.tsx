import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Card, Fab, Fade, Stack } from '@mui/material';
import { Switcher } from '@prisma/client';
import React from 'react';
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
  // {
  //   id: 3,
  //   name: "piyo",
  //   ipaddress: "192.168.1.3",
  //   enabled: true
  // },
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
  return (
    <Stack>
      <Fade in={showNewCard} timeout={500}>
        {showNewCard ?
          <RefFunctionSwitchSettingCard
            inputs={{
              id: 0,
              name: '',
              ipaddress: '',
              enabled: true
            }}
          />
          :
          <div></div>
        }
      </Fade>
      {switchers.map(switcher => (
        <FunctionSwitchSettingCard
          key={switcher.id}
          inputs={switcher}
        />
      ))}
      <Fab
        color="primary"
        aria-label="add"
        sx={(theme) => ({
          position: 'fixed',
          right: theme.spacing(4),
          bottom: theme.spacing(4),
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
