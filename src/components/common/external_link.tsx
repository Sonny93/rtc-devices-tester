import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

const LINK_CLASSES = 'text-blue-600 hover:underline dark:text-blue-400';

type ExternalLinkProps = Readonly<ComponentPropsWithoutRef<'a'>>;

const ExternalLink = ({ className, children, ...props }: ExternalLinkProps) => (
  <a
    target="_blank"
    rel="noreferrer"
    className={clsx(LINK_CLASSES, className)}
    {...props}
  >
    {children}
  </a>
);
export default ExternalLink;
