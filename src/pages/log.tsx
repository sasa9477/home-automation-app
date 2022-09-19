import { Box, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import useSWR from 'swr';

import type { NextPage } from 'next'

const fetcher = (url: string): Promise<any> => fetch(url).then(res => res.json())

function useLoger() {
  const { data, error } = useSWR('/api/log/get', fetcher)
  return {
    isLoading: !error && !data,
    data,
    error
  }
}

type LogPageProps = {
}

const LogPage: NextPage<LogPageProps> = ({ }) => {
  const { isLoading, data, error } = useLoger()

  return (
    <Stack sx={{ m: 1 }}>
      {isLoading &&
        <Typography sx={{ alignSelf: 'center' }}>
          Loading...
        </Typography>
      }
      {data?.log &&
        <Typography sx={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
          {data.log}
        </Typography>
      }
    </Stack>
  )
}

export default LogPage
