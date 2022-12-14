import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Card, Fade, FormControlLabel, Stack, Switch, TextField, Typography } from '@mui/material';
import { Switcher } from '@prisma/client';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useToggle } from 'react-use';

import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import useApiClient from '../utils/apiClient';

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
  const prefersReducedMotion = usePrefersReducedMotion()
  const { apiClient } = useApiClient()
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
            label="??????"
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
              ??????
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
                transition: !prefersReducedMotion ? 'transform 0.5s' : undefined,
                transform: !prefersReducedMotion ? (isEdit ? 'rotate(90deg)' : 'rotate(0deg)') : undefined,
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
            {!isEdit ? '??????' : '??????'}
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
            ??????
          </Button>
        </Box>
        <Controller
          name="name"
          control={control}
          rules={{
            required: '?????????????????????????????????',
            validate: {
              duplicateCheck: value => delegate.duplicateCheck('name', value, input.name)
            }
          }}
          render={({ field }) => (
            <TextField
              {...field}
              type="text"
              label="??????"
              disabled={!isEdit}
              inputProps={{ spellCheck: false }}
              error={errors.name !== undefined}
              helperText={errors.name?.type === 'duplicateCheck' ? '???????????????????????????????????????????????????' : errors.name?.message}
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
              required: 'IP???????????????????????????????????????',
              pattern: {
                value: /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/,
                message: 'IP????????????(v4)????????????????????????????????????'
              },
              validate: {
                duplicateCheck: value => delegate.duplicateCheck('ipaddress', value, input.ipaddress)
              }
            }}
            render={({ field }) => (
              <TextField
                {...field}
                type="text"
                label="IP????????????"
                placeholder='192.168.0.1'
                inputProps={{ inputMode: 'decimal' }}
                disabled={!isEdit}
                error={errors.ipaddress !== undefined}
                helperText={errors.ipaddress?.type === 'duplicateCheck' ? '??????IP???????????????????????????????????????????????????' : errors.ipaddress?.message}
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
            ??????
          </Button>
        </Box>
      </Stack>
    </Card >
  )
}

export default SwitchSettingCard
