import { Box, Stack, Typography } from '@mui/material';
import { Log } from '@prisma/client';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

import { prismaClient } from '../utils/prismaClient';

import type { GetServerSideProps, NextPage } from 'next'

type LogViewModel = Omit<Log, 'createdAt'> & {
  createdAt: string
}

type LogPageProps = {
  logs: LogViewModel[]
}

export const getServerSideProps: GetServerSideProps<LogPageProps> = async (context) => {
  const data = await prismaClient.log.findMany({
    orderBy: {
      createdAt: 'asc'
    }
  })

  const logs: LogViewModel[] = data.map(item => {
    return {
      ...item,
      createdAt: format(item.createdAt, 'yyyy/MM/d HH:mm:ss', { locale: ja })
    }
  })

  return {
    props: {
      logs
    }
  }
}

const LogPage: NextPage<LogPageProps> = ({ logs }) => {
  return (
    <Stack sx={{ m: 1 }}>
      {logs.map(log => (
        <Box key={log.id}>
          <Typography variant='caption'>
            {log.createdAt}
          </Typography>
          <Typography>
            {log.message}
          </Typography>
        </Box>
      ))}
      {logs.length === 0 &&
        <Typography sx={{ alignSelf: 'center' }}>
          データがありません
        </Typography>
      }
    </Stack>
  )
}

export default LogPage
