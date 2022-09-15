import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, Button, Card, Fade, FormControlLabel, keyframes, Stack, Switch, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useFirstMountState, useMount, useToggle } from 'react-use';

import apiClient from '../utils/apiClient';

type FormInputs = {
  id: number,
  name: string,
  ipaddress: string,
  enabled: boolean
}

type FunctionSwitchSettingCardProps = {
  inputs: FormInputs,
  forwardRef?: React.Ref<HTMLDivElement>,
  delegate: {
    onDeleteButtonClick: (id: number) => void
  }
}

const FunctionSwitchSettingCard: React.FC<FunctionSwitchSettingCardProps> = ({ inputs, forwardRef, delegate }) => {
  const isCreateNew = inputs.id === 0;
  const isFirstMount = useFirstMountState();
  const [isEdit, toggleEdit] = useToggle(isCreateNew);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { control, handleSubmit, formState: { errors }, reset } = useForm<FormInputs>({
    defaultValues: {
      ...inputs
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    // await apiClient.switcher.update({ ...data })
    console.log(`submit: ${JSON.stringify(data, null, 2)}`)
    toggleEdit()
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

  useEffect(() => {
    if (isCreateNew) {
      setTimeout(() => {
        nameInputRef.current?.focus()
      }, 100)
    }
  }, [isCreateNew])

  return (
    <Card
      ref={forwardRef}
      tabIndex={0}
      sx={{ m: 1 }}
    >
      <Stack
        component={"form"}
        noValidate
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
              <Typography>{field.value}</Typography>
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
                  disabled={!isEdit}
                  onChange={e => field.onChange(e.target.checked)}
                />
              )}
            />}
          />
          <Button
            sx={{
              display: isCreateNew ? 'none' : undefined,
              marginLeft: 'auto'
            }}
            variant='contained'
            endIcon={<SettingsIcon
              sx={{
                animation: `${isFirstMount ? '' : (isEdit ? rotate0animation : rotate90animation)} 1s ease forwards`
              }}
            />}
            onClick={() => {
              if (!isEdit && nameInputRef.current) {
                nameInputRef.current.disabled = false
                nameInputRef.current.focus()
              }
              toggleEdit()
            }}
          >
            {!isEdit ? '編集' : '取消'}
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
              error={errors.name !== undefined}
              helperText={errors.name?.message}
              size="small"
              inputRef={nameInputRef}
              onFocus={() => nameInputRef.current?.focus()}
            />
          )}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: theme => theme.spacing(1)
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
                  // marginRight: (theme) => theme.spacing(2)
                }}
              />
            )}
          />
          <div>
            <Button variant='contained' type="submit" disabled={!isEdit}>
              保存
            </Button>
          </div>
          {/* <div>
            <Button
              variant='contained'
              color='error'
              disabled={!isEdit}
              onClick={() => {
                reset()
                delegate.onDeleteButtonClick(inputs.id)
              }}
            >
              削除
            </Button>
          </div> */}
        </Box>
      </Stack>
    </Card >
  )
}

export default FunctionSwitchSettingCard


// Fade(Mui API)を使用するために HOC(高層コンポーネント)が必要
// https://mui.com/material-ui/transitions/#child-requirement
// https://www.gaji.jp/blog/2021/01/08/6247/
// divを介して refと propsをバケツリレーでわたす必要がある
// divにないプロパティをわたすとエラーになるので、オブジェクトでラップしてわたす
export const RefFunctionSwitchSettingCard = React.forwardRef<HTMLDivElement, FunctionSwitchSettingCardProps>(
  (props, ref) => {
    return (
      <div ref={ref} {...props}>
        <FunctionSwitchSettingCard {...props} />
      </div>
    )
  })
