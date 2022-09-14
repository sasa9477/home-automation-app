import type { NextPage } from 'next'
import { Grid } from '@mui/material';
import FunctionSwitchSettingCard from '../components/FunctionSwitchSettingCard';

const SettingPage: NextPage = () => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <FunctionSwitchSettingCard
          id={1}
          name={"hoge"}
          ipaddress={"192.168.0.100"}
          enabled={true}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FunctionSwitchSettingCard
          id={2}
          name={"hoge"}
          ipaddress={"192.168.0.100"}
          enabled={false}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FunctionSwitchSettingCard
          id={3}
          name={"hoge"}
          ipaddress={"192.168.0.100"}
          enabled={false}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        <FunctionSwitchSettingCard
          id={4}
          name={"hoge"}
          ipaddress={"192.168.0.100"}
          enabled={false}
        />
      </Grid>
    </Grid>
  )
}

export default SettingPage
