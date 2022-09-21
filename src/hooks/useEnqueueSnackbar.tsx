import { useSnackbar } from 'notistack';

import ErrorSnackbar, { HttpError } from '../components/ErrorSnackbar';

const useEnqueueSnackbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const enqueueErrorSnackbar = (message: string, options?: { httpError?: HttpError }) =>
    enqueueSnackbar(message, { content: (key, message) => <ErrorSnackbar snackbarKey={key} message={message} httpError={options?.httpError} /> })

  return {
    enqueueErrorSnackbar,
  };

};

export default useEnqueueSnackbar
