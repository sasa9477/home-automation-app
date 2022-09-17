import { Fade, Input, Stack } from '@mui/material';
import { Switcher } from '@prisma/client';
import React, { Dispatch, useCallback, useEffect, useReducer, useRef, useState } from 'react';
import { useMount } from 'react-use';

import { useMyAppContext } from '../components/MyAppContextProvider';
import SwitchSettingCard, { FormInput } from '../components/SwitchSettingCard';
import SwitchSettingCardRef from '../components/SwitchSettingCardRef';
import apiClient from '../utils/apiClient';

import type { NextPage } from 'next'
type SettingPageProps = {
}

const SettingPage: NextPage<SettingPageProps> = ({ }) => {
  const { shownNewCard: isShownNewCard } = useMyAppContext()
  const [switchers, setSwitchers] = useState<Switcher[]>([])
  const [fadeNewCard, setFadeNewCard] = useState(false)
  const [shownNewCard, setShownNewCard] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)

  const onSaveButtonClick = useCallback(async (data: FormInput) => {
    console.log(`submit: ${JSON.stringify(data, null, 2)}`)
    if (data.id === 0) {
      // remove id value from data
      const { id, ...req } = data
      await apiClient.switcher.create({ ...req })

      const res = await apiClient.switcher.get()
      if (res.status === 200) {
        setSwitchers(res.data)
      }
    } else {
      await apiClient.switcher.update({ ...data })

      const res = await apiClient.switcher.get()
      if (res.status === 200) {
        setSwitchers(res.data)
      }
    }
  }, [])

  const onDeleteButtonClick = useCallback(async (id: number) => {
    console.log(id)
    await apiClient.switcher.delete({ id: id })

    const res = await apiClient.switcher.get()
    if (res.status === 200) {
      setSwitchers(res.data)
    }
  }, [setSwitchers])

  const onCancelNewCardButtonClick = useCallback(() => {
    // scroll on cancel
    if (cardRef.current) {
      const scrollHeight = cardRef.current.clientHeight * -1
      window.scrollBy({ top: scrollHeight, left: 0, behavior: 'smooth' });
    }
  }, [])

  useEffect(() => {
    if (isShownNewCard) {
      // appear new card
      setShownNewCard(true)
      setFadeNewCard(true)
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, left: 0, behavior: 'smooth' });
      }, 100)
    } else {
      // hide new card on save or cancel
      setFadeNewCard(false)
      setTimeout(() => {
        setShownNewCard(false)
      }, 300)
    }
  }, [isShownNewCard])

  useMount(() => {
    (async () => {
      const res = await apiClient.switcher.get()
      if (res.status === 200) {
        setSwitchers(res.data)
      }
    })()
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
            onCancelNewCardButtonClick
          }}
        />
      ))}
      <Fade
        in={fadeNewCard}
        style={{
          display: shownNewCard ? undefined : 'none',
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
            onCancelNewCardButtonClick
          }}
          ref={cardRef}
        />
      </Fade>
    </Stack>
  )
}

export default SettingPage
