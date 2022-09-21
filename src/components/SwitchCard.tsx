import { Card, FormControlLabel, Switch, Typography } from '@mui/material';
import React, { EventHandler, ReactElement, useCallback } from 'react';

import useApiClient from '../utils/apiClient';

type SwitchCardProps = {
  id: number;
  label: string;
  turnOn?: boolean;
}

const SwitchCard: React.FC<SwitchCardProps> = ({ id, label, turnOn }): JSX.Element => {
  const { apiClient } = useApiClient()
  const onChnageSwitch = useCallback(async (checked: boolean) => {
    await apiClient.switcher.update({ id, turnOn: checked })
  }, [apiClient, id])

  return (
    <Card
      sx={{
        width: '100%'
      }}>
      <FormControlLabel
        label={
          <Typography paddingLeft={1} noWrap>
            {label}
          </Typography >
        }
        labelPlacement='start'
        control={< Switch color="primary" />}
        checked={turnOn}
        onChange={(_, checked) => onChnageSwitch(checked)}
        sx={{
          width: '100%',
          margin: 0,
          justifyContent: 'space-between',
        }}
      />
    </Card>
  )
}

export default SwitchCard
