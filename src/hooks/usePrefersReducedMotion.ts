import { useMediaQuery } from '@mui/material';

// https://developer.mozilla.org/ja/docs/Web/CSS/@media/prefers-reduced-motion
const usePrefersReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

export default usePrefersReducedMotion;
