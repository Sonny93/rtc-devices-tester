import '@emotion/react';
import { UITheme } from '@minimalstuff/ui';

declare module '@emotion/react' {
  export interface Theme extends UITheme {}
}
