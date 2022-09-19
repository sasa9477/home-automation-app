import { Fade, Stack, Typography } from '@mui/material';
import { Switcher } from '@prisma/client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useMount, useUnmount } from 'react-use';

import SwitchSettingCard, { FormInput } from '../components/SwitchSettingCard';
import SwitchSettingCardRef from '../components/SwitchSettingCardRef';
import usePubSub from '../hooks/usePubsub';
import apiClient, { useSwitcherSWR } from '../utils/apiClient';
import { prismaClient } from '../utils/prismaClient';

import type { GetServerSideProps, NextPage } from 'next'

type SettingPageProps = {
  fallback: {
    switchers: Switcher[]
  }
}

export const getServerSideProps: GetServerSideProps<SettingPageProps> = async (context) => {
  const data = await prismaClient.switcher.findMany({
    orderBy: {
      id: 'asc',
    },
  });

  // Date型のシリアライズに失敗するので置きなおす
  // https://github.com/vercel/next.js/issues/11993
  const switchers = JSON.parse(JSON.stringify(data))

  return {
    props: {
      fallback: {
        switchers
      }
    }
  }
}

const SettingPage: NextPage<SettingPageProps> = ({ fallback }) => {
  const { isLoading, switchers, mutate } = useSwitcherSWR(fallback.switchers)
  const { subscribe, unsubscribe } = usePubSub()
  const [shownNewCardArea, setShownNewCardArea] = useState(false)
  const [fadeNewCard, setFadeNewCard] = useState(false)
  const newCardRef = useRef<HTMLDivElement | null>(null)

  const onSaveButtonClick = useCallback(async (input: FormInput) => {
    if (input.id === 0) {
      // remove id value from data
      const { id, ...req } = input
      await apiClient.switcher.create({ ...req })
      setFadeNewCard(false)
    } else {
      await apiClient.switcher.update({ ...input }).catch((reason) => {
        console.log(reason)
      })
    }
    mutate()
  }, [mutate])

  const onDeleteButtonClick = useCallback(async (id: number) => {
    await apiClient.switcher.delete({ id: id })
    mutate()
  }, [mutate])

  const onCancelNewCardButtonClick = useCallback(() => {
    // scroll up and hide on cancel
    if (newCardRef.current) {
      const scrollHeight = newCardRef.current.clientHeight * -1
      window.scrollBy({ top: scrollHeight, left: 0, behavior: 'smooth' });
    }
    setFadeNewCard(false)
  }, [])

  const duplicateCheck = useCallback((propName: keyof Switcher, value: string, originalValue: string) => {
    if (!switchers || value === originalValue) {
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
    subscribe('AppBarButtonClickEvent', onAppBarButtonClick)
  })

  useUnmount(() => {
    unsubscribe('AppBarButtonClickEvent', onAppBarButtonClick)
  })

  return (
    <Stack>
      {!isLoading && switchers?.length === 0 &&
        <Typography sx={{ mt: 2, alignSelf: 'center' }}>
          データがありません
        </Typography>
      }
      {switchers && switchers.map(switcher => (
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
