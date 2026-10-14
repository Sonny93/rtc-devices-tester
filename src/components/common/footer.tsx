import ExternalLink from '#/components/common/external_link';
import { version } from '../../../package.json';

const Footer = () => (
  <footer className="mt-auto flex flex-wrap items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
    <span>Made with ❤️ by</span>
    <ExternalLink href="https://www.sonny.dev/">Sonny</ExternalLink>
    <span>•</span>
    <ExternalLink href="https://github.com/Sonny93/rtc-devices-tester">
      {version}
    </ExternalLink>
  </footer>
);
export default Footer;
