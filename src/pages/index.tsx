import type { GetStaticProps, NextPage } from 'next'
import { Stack } from '@mui/material';
import { SWitcher } from '@prisma/client';
import FunctionSwitchCard from '../components/FunctionSwitchCard';
import { prismaClient } from '../utils/prismaClient';

type HomePageProps = {
  swichers: SWitcher[]
}

export const getStaticProps: GetStaticProps<HomePageProps> = async (context) => {
  const swichers = await prismaClient.sWitcher.findMany({
    where: {
      enabled: true
    },
    orderBy: {
      id: 'asc'
    }
  })

  return {
    props: {
      swichers: swichers
    }
  }
}

const Home: NextPage<HomePageProps> = (props) => {
  return (
    <Stack
      sx={{
        m: 1,
        p: 1,
        rowGap: 2,
      }}>
      {props.swichers.map((switcher) => (
        <FunctionSwitchCard
          key={switcher.id}
          label={switcher.name}/>
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
