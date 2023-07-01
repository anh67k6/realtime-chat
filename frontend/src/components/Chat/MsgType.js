import React from 'react'
import { Stack, Divider, Typography, Box } from '@mui/material';
import {useTheme} from '@mui/material/styles';

const TimeLine = ({ el }) => {
  const theme = useTheme();
  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <Divider width="46%" />
      <Typography variant='caption' sx={{ color: theme.palette.text.primary }}>{el.message}</Typography>
      <Divider width='46%' />
    </Stack>
  );
};

export { TimeLine };
