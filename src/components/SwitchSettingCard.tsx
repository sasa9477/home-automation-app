import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Card, Fade, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material';
import { Switcher } from '@prisma/client';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';

import apiClient from '../utils/apiClient';

export type FormInput = {
  id: number,
  name: string,
  ipaddress: string,
  enabled: boolean,
  turnOn: boolean
}

export type SwitchSettingCardProps = {
  forwardRef?: React.Ref<HTMLDivElement>,
  input: FormInput,
  delegate: {
    onSaveButtonClick: (input: FormInput) => void,
    onDeleteButtonClick: (id: number) => void,
    onCancelNewCardButtonClick: () => void,
    duplicateCheck: (propName: keyof Switcher, value: string, originalValue: string) => boolean
  }
}

const SwitchSettingCard: React.FC<SwitchSettingCardProps> = ({ forwardRef, input, delegate }) => {
  const isCreateNew = input.id === 0;
  const [isEdit, toggleEdit] = useToggle(isCreateNew);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { formState: { isDirty, errors }, control, handleSubmit, reset } = useForm<FormInput>({
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
      // update default values
      reset(data)
      delegate.onSaveButtonClick(data)
    } else {
      delegate.onSaveButtonClick(data)
      setTimeout(() => {
        reset()
      }, 300);
    }
  }

  return (
    <Card
      ref={forwardRef}
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
                transition: 'transform 0.5s',
                transform: isEdit ? 'rotate(90deg)' : 'rotate(0deg)',
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
            required: '名前を入力してください',
            validate: {
              duplicateCheck: value => delegate.duplicateCheck('name', value, input.name)
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="名前"
              disabled={!isEdit}
              inputProps={{ spellCheck: false }}
              error={errors.name !== undefined}
              helperText={errors.name?.type === 'duplicateCheck' ? '同じ名前を登録することはできません' : errors.name?.message}
              size="small"
              inputRef={nameInputRef}
              onFocus={() => nameInputRef.current?.focus()}
            />
          )}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Controller
            name="ipaddress"
            control={control}
            rules={{
              required: 'IPアドレスを入力してください',
              pattern: {
                value: /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
                message: 'IPアドレス(v4)の形式で入力してください'
              },
              validate: {
                duplicateCheck: value => delegate.duplicateCheck('ipaddress', value, input.ipaddress)
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="IPアドレス"
                placeholder='192.168.0.1'
                inputProps={{ inputMode: 'decimal' }}
                disabled={!isEdit}
                error={errors.ipaddress !== undefined}
                helperText={errors.ipaddress?.type === 'duplicateCheck' ? '同じIPアドレスを登録することはできません' : errors.ipaddress?.message}
                size="small"
                sx={{
                  width: '100%',
                }}
              />
            )}
          />
          <Button
            variant='contained'
            type="submit"
            disabled={!(isEdit && isDirty)}
            sx={{
              height: '40px',
              marginLeft: theme => theme.spacing(2)
            }}
          >
            保存
          </Button>
        </Box>
      </Stack>
    </Card >
  )
}

export default SwitchSettingCard
