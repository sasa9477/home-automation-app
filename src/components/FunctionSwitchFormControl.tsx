import { FormControlLabel, FormControlLabelProps, styled, Switch, Typography } from "@mui/material"

type FunctionSwitchFormCotrolProps = {
  checked?: boolean;
  label: React.ReactNode;
}

const FunctionSwitchFormCotrol: React.FC<FunctionSwitchFormCotrolProps> = (props): JSX.Element => {
  return (
    <FormControlLabel
      label={<Typography paddingLeft='8px' >{props.label}</Typography >}
      labelPlacement='start'
      control={< Switch color="primary" />}
      checked={props.checked}
      sx={(theme) => ({
        margin: 0,
        justifyContent: 'space-between',
        flexGrow: 1,
        background: theme.palette.success.main,
        borderRadius: '4px'
      })}
    />
  )
}

export default FunctionSwitchFormCotrol
