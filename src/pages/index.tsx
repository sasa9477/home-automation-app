import type { NextPage } from 'next'
import { Button, Stack } from '@mui/material';

const Home: NextPage = () => {
  return (
    <main>
      <Stack spacing={2} sx={{ m: 2, p: 2 }}>
        <Button variant="contained" color="primary">primary</Button>
        <Button variant="contained" color="secondary">secondary</Button>
        <Button variant="contained" color="warning">warning</Button>
        <Button variant="contained" color="info">info</Button>
        <Button variant="contained" color="success">success</Button>
      </Stack>
    </main>
  )
}

export default Home
