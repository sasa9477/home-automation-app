import { Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { useMount, useUnmount } from 'react-use';

import usePubSub from '../hooks/usePubsub';
import useApiClient from '../utils/apiClient';

import type { NextPage } from 'next'
const errorTypeRegex = /(INFO|WARN|ERROR)/g
const errorTypeWithTag: Record<string, string> = {
  'INFO': '<span className="info">INFO</span>',
  'WARN': '<span className="warn">WARN</span>',
  'ERROR': '<span className="error">ERROR</span>'
}

type LogPageProps = {
}

const LogPage: NextPage<LogPageProps> = ({ }) => {
  const { apiClient, useLogSWR } = useApiClient()
  const { data, mutate } = useLogSWR()
  const [log, setLog] = useState('')
  const { subscribe, unsubscribe } = usePubSub()

  useEffect(() => {
    if (data) {
      const formatedData = data.log.replace(errorTypeRegex, errorType => (errorTypeWithTag[errorType]))
      setLog(formatedData)
      setTimeout(() => {
        // scroll to end
        window.scrollTo({ top: document.body.scrollHeight, left: 0 });
      }, 100);
    }
  }, [data, setLog])

  const onAppBarButtonClick = () => {
    apiClient.log.delete()
    setTimeout(() => {
      mutate()
    }, 100)
  }

  useMount(() => {
    subscribe('AppBarClearLogButtonClickEvent', onAppBarButtonClick)
  })

  useUnmount(() => {
    unsubscribe('AppBarClearLogButtonClickEvent', onAppBarButtonClick)
  })

  return (
    <Typography
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
    </Typography>
  )
}

export default LogPage
