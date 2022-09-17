import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Card, Fade, FormControlLabel, keyframes, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useFirstMountState, useMount, useToggle } from 'react-use';

import apiClient from '../utils/apiClient';

export type FormInput = {
  id: number,
  name: string,
  ipaddress: string,
  enabled: boolean,
  turnOn: boolean
}

export type SwitchSettingCardProps = {
  input: FormInput,
  forwardRef?: React.Ref<HTMLDivElement>,
  delegate: {
    onSaveButtonClick: (input: FormInput) => void,
    onDeleteButtonClick: (id: number) => void,
    onCancelNewCardButtonClick: () => void
  }
}

const SwitchSettingCard: React.FC<SwitchSettingCardProps> = ({ input, forwardRef, delegate }) => {
  const isCreateNew = input.id === 0;
  const isFirstMount = useFirstMountState()
  const [isEdit, toggleEdit] = useToggle(isCreateNew);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { formState: { errors }, control, handleSubmit, reset } = useForm<FormInput>({
    defaultValues: {
      ...input
    },
  })

  const onChangeEnableSwitch = async (enabled: boolean) => {
    if (!isCreateNew) {
      await apiClient.switcher.update({ id: input.id, enabled })
    }
  }

  const onSubmit = async (data: FormInput) => {
    if (!isCreateNew) {
      toggleEdit()
      await delegate.onSaveButtonClick(data)
    } else {
      await delegate.onSaveButtonClick(data)
      // TODO: settingspageと同期をとる
      setTimeout(() => {
        reset()
      }, 300);
    }
  }

  const rotate0animation = keyframes`
    from {
      transform: rotate(-90deg);
    }
    to {
      transform: rotate(0deg);
    }
  `

  const rotate90animation = keyframes`
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-90deg);
    }
  `

  return (
    <Card
      ref={forwardRef}
      tabIndex={0}
      sx={{ m: 1 }}
    >
      <Stack
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
        spacing={2}
        sx={{ m: 2 }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography>ID: </Typography>
          <Controller
            name="id"
            control={control}
            render={({ field }) => (
              <Typography>{field.value ? field.value : ''}</Typography>
            )}
          />
          <FormControlLabel
            label="有効"
            labelPlacement='start'
            control={<Controller
              name="enabled"
              control={control}
              render={({ field }) => (
                <Switch
                  color="primary"
                  checked={field.value}
                  onChange={e => {
                    field.onChange(e.target.checked)
                    onChangeEnableSwitch(e.target.checked)
                  }}
                />
              )}
            />}
          />
          <Fade in={!isCreateNew && isEdit}>
            <Button
              variant='contained'
              color='error'
              sx={{
                marginLeft: 'auto'
              }}
              onClick={() => {
                reset()
                delegate.onDeleteButtonClick(input.id)
              }}
            >
              削除
            </Button>
          </Fade>
          <Button
            sx={{
              display: isCreateNew ? 'none' : undefined,
              marginLeft: theme => theme.spacing(1)
            }}
            variant='contained'
            endIcon={<SettingsIcon
              sx={{
                animation: `${isFirstMount ? '' : (isEdit ? rotate0animation : rotate90animation)} 0.3s ease forwards`
              }}
            />}
            onClick={() => {
              if (!isEdit && nameInputRef.current) {
                nameInputRef.current.disabled = false
                nameInputRef.current.focus()
              }
              reset()
              toggleEdit()
            }}
          >
            {!isEdit ? '編集' : '取消'}
          </Button>
          <Button
            sx={{
              display: isCreateNew ? undefined : 'none',
              marginLeft: 'auto'
            }}
            color='error'
            variant='contained'
            onClick={() => {
              reset()
              delegate.onCancelNewCardButtonClick()
            }}
          >
            取消
          </Button>
        </Box>
        <Controller
          name="name"
          control={control}
          rules={{
            required: '名前を入力してください'
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="名前"
              disabled={!isEdit}
              inputProps={{ spellCheck: false }}
              error={errors.name !== undefined}
              helperText={errors.name?.message}
              size="small"
              inputRef={nameInputRef}
              onFocus={() => nameInputRef.current?.focus()}
            />
          )}
        />
        <Controller
          name="ipaddress"
          control={control}
          rules={{
            required: 'IPアドレスを入力してください',
            pattern: {
              value: /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
              message: 'IPアドレス(v4)の形式で入力してください'
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="IPアドレス"
              placeholder='192.168.0.1'
              inputProps={{
                inputMode: 'decimal',
                pattern: '/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/'
              }}
              disabled={!isEdit}
              error={errors.ipaddress !== undefined}
              helperText={errors.ipaddress?.message}
              size="small"
              sx={{
                width: '100%',
              }}
            />
          )}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <FormControlLabel
            label="スイッチON"
            labelPlacement='start'
            control={<Controller
              name="turnOn"
              control={control}
              render={({ field }) => (
                <Switch
                  color="primary"
                  checked={field.value}
                  disabled={!isEdit}
                  onChange={e => field.onChange(e.target.checked)} />
              )}
            />}
          />
          <Button
            variant='contained'
            type="submit"
            disabled={!isEdit}
          >
            保存
          </Button>
        </Box>
      </Stack>
    </Card >
  )
}

export default SwitchSettingCard
