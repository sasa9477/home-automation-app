import type { NextPage } from 'next'
import { Stack } from '@mui/material';
import FunctionSwitchSettingCard from '../components/FunctionSwitchSettingCard';

const SettingPage: NextPage = () => {
  return (
    <Stack>
      <FunctionSwitchSettingCard
        id={1}
        name={"hoge"}
        ipaddress={"192.168.0.100"}
        enabled={true}
      />
      <FunctionSwitchSettingCard
        id={2}
        name={"hoge"}
        ipaddress={"192.168.0.100"}
        enabled={false}
      />
      <FunctionSwitchSettingCard
        id={3}
        name={"hoge"}
        ipaddress={"192.168.0.100"}
        enabled={false}
      />
      <FunctionSwitchSettingCard
        id={4}
        name={"hoge"}
        ipaddress={"192.168.0.100"}
        enabled={false}
      />
    </Stack>
  )
}

export default SettingPage
