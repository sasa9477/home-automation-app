import { Box, Stack, Typography } from '@mui/material';
import { Log } from '@prisma/client';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

import { LogLevel } from '../utils/log';
import { prismaClient } from '../utils/prismaClient';

import type { GetServerSideProps, NextPage } from 'next'

type LogViewModel = Omit<Log, 'logLevel' | 'createdAt'> & {
  logLevel: string,
  createdAt: string,
  logColor: string
}

type LogPageProps = {
  logs: LogViewModel[]
}

const logColors = ['', 'info.main', 'warning.main', 'error.main']

export const getServerSideProps: GetServerSideProps<LogPageProps> = async (context) => {

  const data = await prismaClient.log.findMany({
    orderBy: {
      createdAt: 'asc'
    }
  })

  const logs: LogViewModel[] = data.map(item => {
    return {
      ...item,
      createdAt: format(item.createdAt, 'yyyy/MM/d HH:mm:ss', { locale: ja }),
      logLevel: LogLevel[item.logLevel],
      logColor: logColors[item.logLevel]
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
        <Typography key={log.id}>
          <Box component={'span'} sx={{ color: 'text.secondary' }}>
            {log.createdAt + ' '}
          </Box>
          <Box component={'span'} sx={{ color: `${log.logColor}` }}>
            {log.logLevel + ' '}
          </Box>
          <Box component='br' sx={{ display: { xs: undefined, sm: 'none' } }} />
          <span>
            {log.message}
          </span>
        </Typography>
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
