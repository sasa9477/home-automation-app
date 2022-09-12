import { Card, FormControlLabel, Switch, Typography } from "@mui/material"

type FunctionSwitchCardProps = {
  checked?: boolean;
  label: React.ReactNode;
}

const FunctionSwitchCard: React.FC<FunctionSwitchCardProps> = (props): JSX.Element => {
  return (
    <Card
      sx={{
        width: '100%'
      }}>
      <FormControlLabel
        label={
          <Typography paddingLeft={1} noWrap>
            {props.label}
          </Typography >
        }
        labelPlacement='start'
        control={< Switch color="primary" />}
        checked={props.checked}
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
