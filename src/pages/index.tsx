import type { NextPage } from 'next'
import { FormGroup } from '@mui/material';
import FunctionSwitchFormCotrol from '../components/FunctionSwitchFormControl';

const Home: NextPage = () => {
  return (
    <FormGroup
      sx={{
        m: 1,
        p: 1,
        rowGap: 2,
      }}>
      <FunctionSwitchFormCotrol
        label="Light 3"
      />
      <FunctionSwitchFormCotrol
        label="Light 3"
      />
      <FunctionSwitchFormCotrol
        label="Light 3"
      />
    </FormGroup >
  )
}

export default Home
