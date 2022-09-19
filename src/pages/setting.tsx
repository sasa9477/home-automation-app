import { Fade, Stack, Typography } from '@mui/material';
import { Switcher } from '@prisma/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMount, useUnmount } from 'react-use';

import SwitchSettingCard, { FormInput } from '../components/SwitchSettingCard';
import SwitchSettingCardRef from '../components/SwitchSettingCardRef';
import usePubSub from '../hooks/usePubsub';
import apiClient from '../utils/apiClient';

import type { NextPage } from 'next'
type SettingPageProps = {
}

const SettingPage: NextPage<SettingPageProps> = ({ }) => {
  const [shownNewCardArea, setShownNewCardArea] = useState(false)
  const [fadeNewCard, setFadeNewCard] = useState(false)
  const newCardRef = useRef<HTMLDivElement | null>(null)
  const loadingRef = useRef(true);
  const [switchers, setSwitchers] = useState<Switcher[]>([])
  const { subscribe, unsubscribe } = usePubSub()

  const loadSwitchers = useCallback(async () => {
    const res = await apiClient.switcher.get()
    if (res.status === 200) {
      setSwitchers(res.data)
    }
  }, [setSwitchers])

  const onSaveButtonClick = useCallback(async (data: FormInput) => {
    if (data.id === 0) {
      // remove id value from data
      const { id, ...req } = data
      await apiClient.switcher.create({ ...req })
      setFadeNewCard(false)
    } else {
      await apiClient.switcher.update({ ...data })
    }
    await loadSwitchers()
  }, [loadSwitchers])

  const onDeleteButtonClick = useCallback(async (id: number) => {
    await apiClient.switcher.delete({ id: id })
    await loadSwitchers()
  }, [loadSwitchers])

  const onCancelNewCardButtonClick = useCallback(() => {
    // scroll up and hide on cancel
    if (newCardRef.current) {
      const scrollHeight = newCardRef.current.clientHeight * -1
      window.scrollBy({ top: scrollHeight, left: 0, behavior: 'smooth' });
    }
    setFadeNewCard(false)
  }, [])

  const duplicateCheck = useCallback((propName: keyof Switcher, value: string, originalValue: string) => {
    if (value === originalValue) {
      return true
    }

    switch (propName) {
      case 'name':
        return !switchers.some(s => s.name === value)
      case 'ipaddress':
        return !switchers.some(s => s.ipaddress === value)
      default:
        return false
    }
  }, [switchers])

  useEffect(() => {
    if (fadeNewCard) {
      setShownNewCardArea(true)
    } else {
      setTimeout(() => {
        setShownNewCardArea(false)
      }, 300);
    }
  }, [fadeNewCard])

  const onAppBarButtonClick = (() => {
    // appear new card
    setFadeNewCard(true)
    setTimeout(() => {
      newCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }, 100)
  })

  useMount(() => {
    (async () => {
      const res = await apiClient.switcher.get()
      if (res.status === 200) {
        setSwitchers(res.data)
        loadingRef.current = false
      }
    })()
    subscribe('AppBarButtonClickEvent', onAppBarButtonClick)
  })

  useUnmount(() => {
    unsubscribe('AppBarButtonClickEvent', onAppBarButtonClick)
  })

  return (
    <Stack>
      {switchers.map(switcher => (
        <SwitchSettingCard
          key={switcher.id}
          input={switcher}
          delegate={{
            onSaveButtonClick,
            onDeleteButtonClick,
            onCancelNewCardButtonClick,
            duplicateCheck
          }}
        />
      ))}
      {!loadingRef.current && switchers.length === 0 &&
        <Typography sx={{ mt: 2, alignSelf: 'center' }}>
          データがありません
        </Typography>
      }
      <Fade
        in={fadeNewCard}
        style={{
          display: shownNewCardArea ? undefined : 'none',
          transitionDelay: fadeNewCard ? '100ms' : '0ms'
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
            onSaveButtonClick,
            onDeleteButtonClick,
            onCancelNewCardButtonClick,
            duplicateCheck
          }}
          ref={newCardRef}
        />
      </Fade>
    </Stack>
  )
}

export default SettingPage
