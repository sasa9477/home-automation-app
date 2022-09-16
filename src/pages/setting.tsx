import { Fade, Stack } from '@mui/material';
import { Switcher } from '@prisma/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import FunctionSwitchSettingCard, { RefFunctionSwitchSettingCard } from '../components/FunctionSwitchSettingCard';
import { useMyAppContext } from '../components/MyAppContextProvider';

import type { GetServerSideProps, NextPage } from 'next'
type SettingPageProps = {
  switchers: Switcher[]
}

export const getServerSideProps: GetServerSideProps<SettingPageProps> = async (context) => {
  const switchers: Switcher[] = [{
    id: 1,
    name: "hoge",
    ipaddress: "192.168.1.1",
    enabled: true,
    turnOn: false
  },
  {
    id: 2,
    name: "fuga",
    ipaddress: "192.168.1.2",
    enabled: false,
    turnOn: false
  },
  {
    id: 3,
    name: "piyo",
    ipaddress: "192.168.1.3",
    enabled: true,
    turnOn: false
  },
  {
    id: 4,
    name: "zoon",
    ipaddress: "192.168.1.4",
    enabled: true,
    turnOn: false
  }]

  return {
    props: {
      switchers
    }
  }
}

const SettingPage: NextPage<SettingPageProps> = ({ switchers }) => {
  const { shownNewCard } = useMyAppContext()
  const [shownFade, setShownFade] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const onDeleteButtonClick = useCallback((id: number) => {
    console.log(id)
  }, [])

  useEffect(() => {
    if (shownNewCard) {
      setShownFade(true)
    } else {
      if (cardRef.current) {
        const scrollHeight = cardRef.current.clientHeight * -1
        window.scrollBy({ top: scrollHeight, left: 0, behavior: 'smooth' });
      }
      setTimeout(() => {
        setShownFade(false)
      }, 300)
    }
  }, [shownNewCard, setShownFade])

  useEffect(() => {
    if (shownFade) {
      window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
    }
  }, [shownFade])

  return (
    <Stack>
      {switchers.map(switcher => (
        <FunctionSwitchSettingCard
          key={switcher.id}
          input={switcher}
          delegate={{
            onDeleteButtonClick
          }}
        />
      ))}
      <Fade
        in={shownNewCard}
        style={{
          display: shownFade ? undefined : 'none',
          transitionDelay: shownNewCard ? '100ms' : '0ms'
        }}
      >
        <RefFunctionSwitchSettingCard
          input={{
            id: 0,
            name: '',
            ipaddress: '',
            enabled: true,
            turnOn: false
          }}
          delegate={{
            onDeleteButtonClick
          }}
          ref={cardRef}
        />
      </Fade>
    </Stack>
  )
}

export default SettingPage
