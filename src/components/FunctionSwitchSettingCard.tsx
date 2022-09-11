import { Box, Button, Card, FormControlLabel, keyframes, Stack, Switch, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import SettingsIcon from '@mui/icons-material/Settings'
import { useFirstMountState, useToggle } from 'react-use';
import { useRef } from 'react';

type FormInputs = {
  id: number,
  name: string,
  ipaddress: string,
  enabled: boolean
}

type FunctionSwitchSettingCardProps = FormInputs & {
}

const FunctionSwitchSettingCard: React.FC<FunctionSwitchSettingCardProps> = (props): JSX.Element => {
  const isFirstMount = useFirstMountState();
  const [isEdit, toggleEdit] = useToggle(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const { control, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      ...props
    }
  })

  const onSubmit: SubmitHandler<FormInputs> = (data: FormInputs) => {
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

  return (
    <Card
      sx={{ m: 2 }}
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
            sx={{ marginLeft: 'auto' }}
            variant='contained'
            endIcon={<SettingsIcon sx={{
              animation: `${isFirstMount ? '' : (isEdit ? rotate0animation : rotate90animation)} 1s ease forwards`
            }} />}
            disabled={isEdit}
            onClick={() => {
              toggleEdit()
              setTimeout(() => {
                nameInputRef.current?.focus()
              }, 100)
            }}
          >
            編集
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
              onFocus={(e) => e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)}
            />
          )}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
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
                inputProps={{
                  inputMode: 'decimal',
                  pattern: '/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/'
                }}
                disabled={!isEdit}
                error={errors.ipaddress !== undefined}
                helperText={errors.ipaddress?.message}
                size="small"
              />
            )}
          />
          <div>
            <Button variant='contained' type="submit" disabled={!isEdit}>
              保存
            </Button>
          </div>
        </Box>
      </Stack>
    </Card >
  )
}

export default FunctionSwitchSettingCard
