import { Fade, Stack } from '@mui/material';
import { Switcher } from '@prisma/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useEffectOnce } from 'react-use';

import { useMyAppContext } from '../components/MyAppContextProvider';
import SwitchSettingCard from '../components/SwitchSettingCard';
import { SwitchSettingCardRef } from '../components/SwitchSettingCardRef';
import apiClient from '../utils/apiClient';

import type { NextPage } from 'next'
type SettingPageProps = {
}

const SettingPage: NextPage<SettingPageProps> = ({ }) => {
  const { shownNewCard } = useMyAppContext()
  const [shownFade, setShownFade] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const [switchers, setSwitchers] = useState<Switcher[]>([])

  const onDeleteButtonClick = useCallback(async (id: number) => {
    console.log(id)
    await apiClient.switcher.delete({ id: id })

    const res = await apiClient.switcher.get()
    if (res.status === 200) {
      setSwitchers(res.data)
    }
  }, [setSwitchers])

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

  useEffect(() => {
    (async () => {
      const res = await apiClient.switcher.get()
      if (res.status === 200) {
        console.log(res.data)
        setSwitchers(res.data)
      }
    })()
  }, [setSwitchers])

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
