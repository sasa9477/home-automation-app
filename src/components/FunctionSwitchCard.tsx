import { Card, FormControlLabel, Switch, Typography } from '@mui/material';
import React, { EventHandler, ReactElement, useCallback } from 'react';

import apiClient from '../utils/apiClient';
import { prismaClient } from '../utils/prismaClient';

type FunctionSwitchCardProps = {
  id: number;
  label: string;
  turnOn?: boolean;
}

const FunctionSwitchCard: React.FC<FunctionSwitchCardProps> = ({ id, label, turnOn }): JSX.Element => {
  const onChnageSwitch = useCallback(async (checked: boolean) => {
    await apiClient.switcher.update({ id, turnOn: checked })
  }, [id])

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

export default FunctionSwitchCard
