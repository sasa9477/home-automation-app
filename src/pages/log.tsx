import { Box, Stack, Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import React from 'react';
import useSWR from 'swr';

import type { NextPage } from 'next'

const errorTypeRegex = /(INFO|WARN|ERROR)/g
const errorTypeWithTag: Record<string, string> = {
  'INFO': '<span className="info">INFO</span>',
  'WARN': '<span className="warn">WARN</span>',
  'ERROR': '<span className="error">ERROR</span>'
}

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
  const [log, setLog] = useState('')
  const { data, error } = useLoger()

  useEffect(() => {
    if (data) {
      const dataLog = data.log as string
      const formatedData = dataLog.replace(errorTypeRegex, errorType => (errorTypeWithTag[errorType]))
      setLog(formatedData)
      // scroll to end
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, left: 0 });
      }, 100);
    }
  }, [data, setLog])

  return (
    <Box
      sx={{
        m: 1,
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap',
        "& .info": {
          color: 'info.main'
        },
        "& .warning": {
          color: "warning.main"
        },
        "& .error": {
          color: 'error.main'
        }
      }}>
      {parse(log)}
    </Box>
  )
}

export default LogPage
