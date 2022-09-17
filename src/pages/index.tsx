import { Stack } from '@mui/material';
import { Switcher } from '@prisma/client';

import SwitchCard from '../components/SwitchCard';
import { prismaClient } from '../utils/prismaClient';

import type { GetServerSideProps, NextPage } from 'next'

type HomePageProps = {
  switchers: Switcher[]
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async (context) => {
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
