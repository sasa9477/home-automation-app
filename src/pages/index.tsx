import type { GetServerSideProps, NextPage } from 'next'
import { Stack } from '@mui/material';
import { Switcher } from '@prisma/client';
import FunctionSwitchCard from '../components/FunctionSwitchCard';
import { prismaClient } from '../utils/prismaClient';

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
        <FunctionSwitchCard
          key={switcher.id}
          label={switcher.name} />
      ))}
      <FunctionSwitchCard
        label="12345678901234567890"
      />
      <FunctionSwitchCard
        label="１２３４５６７８９０１２３４５６７８９０１２３４５６７８９０"
      />
      <FunctionSwitchCard
        label="Light 3"
      />
    </Stack >
  )
}

export default Home
