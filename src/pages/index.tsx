import { Stack } from '@mui/material';
import { Switcher } from '@prisma/client';

import SwitchCard from '../components/SwitchCard';
import { prismaClient } from '../utils/prismaClient';

import type { GetServerSideProps, NextPage } from 'next'

type HomePageProps = {
  switchers: Switcher[]
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
  const data = await prismaClient.switcher.findMany({
    where: {
      enabled: true
    },
    orderBy: {
      id: 'asc'
    }
  })
  // Date型のシリアライズに失敗するので置きなおす
  // https://github.com/vercel/next.js/issues/11993
  const switchers = JSON.parse(JSON.stringify(data))

  return {
    props: {
      switchers
    }
  }
}

const Home: NextPage<HomePageProps> = ({ switchers }) => {
  return (
    <Stack
      sx={{
        m: 1,
        p: 1,
        rowGap: 2,
      }}>
      {switchers.map((switcher) => (
        <SwitchCard
          key={switcher.id}
          id={switcher.id}
          label={switcher.name} />
      ))}
    </Stack >
  )
}

export default Home
