import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { SnackbarContent, SnackbarKey, SnackbarMessage, useSnackbar } from 'notistack';
import { forwardRef, useCallback } from 'react';

export type HttpError = {
  status?: number,
  errorCode: string,
  url: string,
}
type ErrorSnackbarProps = {
  snackbarKey: SnackbarKey,
  message: SnackbarMessage,
  httpError?: HttpError
}

const ErrorSnackbar = forwardRef<HTMLDivElement, ErrorSnackbarProps>(({ snackbarKey, message, httpError }, ref) => {
  const theme = useTheme()
  const { closeSnackbar } = useSnackbar();

  const handleDismiss = useCallback(() => {
    closeSnackbar(snackbarKey);
  }, [snackbarKey, closeSnackbar]);

  return (
    <SnackbarContent ref={ref} style={{
      backgroundColor: theme.palette.error.dark,
      color: 'white',
      padding: '6px 16px',
      borderRadius: '4px',
      boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
    }}>
      <Box sx={{
        width: '100%',
        display: 'flex',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Typography sx={{
          paddingRight: theme => theme.spacing(1),
          wordBreak: 'break-word'
        }}>
          {httpError &&
            <span>
              {`${httpError.status} ${httpError.errorCode}`}<br />
              {httpError.url}<br />
            </span>
          }
          {message}
        </Typography>
        <IconButton size='small' onClick={handleDismiss}>
          <CloseIcon />
        </IconButton>
      </Box>
    </SnackbarContent>
  );
});

export default ErrorSnackbar;
