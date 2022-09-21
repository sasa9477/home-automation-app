import { Typography } from '@mui/material';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';

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
  const { useLogSWR } = useApiClient()
  const { data } = useLogSWR()
  const [log, setLog] = useState('')

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
