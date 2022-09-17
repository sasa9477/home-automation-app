import { Fade, Stack } from '@mui/material';
import { Switcher } from '@prisma/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useMyAppContext } from '../components/MyAppContextProvider';
import SwitchSettingCard, { SwitchSettingCardRef } from '../components/SwitchSettingCard';
import { prismaClient } from '../utils/prismaClient';

import type { GetServerSideProps, NextPage } from 'next'

type SettingPageProps = {
  switchers: Switcher[]
}

export const getServerSideProps: GetServerSideProps<SettingPageProps> = async (context) => {
  const switchers = await prismaClient.switcher.findMany({
    where: {
      enabled: true
    },
    orderBy: {
      id: 'asc'
    }
  })

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
        <SwitchSettingCard
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
        <SwitchSettingCardRef
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
