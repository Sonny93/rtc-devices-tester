import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

type MutedTextProps = Readonly<ComponentPropsWithoutRef<'p'>>;

const MutedText = ({ className, ...props }: MutedTextProps) => (
  <p className={clsx('text-gray-500 dark:text-gray-400', className)} {...props} />
);
export default MutedText;
