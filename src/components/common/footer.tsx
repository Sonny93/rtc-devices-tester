import packageJson from '@/package.json';
import styled from '@emotion/styled';
import { ExternalLink } from '@minimalstuff/ui';

const FooterStyle = styled.footer(({ theme }) => ({
  color: theme.colors.grey.default,
}));

const Footer = () => (
  <FooterStyle>
    Made with ❤️ by{' '}
    <ExternalLink href="https://www.sonny.dev/">Sonny</ExternalLink>
    {' • '}
    <span>
      Version:{' '}
      <ExternalLink href="https://github.com/Sonny93/rtc-devices-tester">
        {packageJson.version}
      </ExternalLink>
    </span>
  </FooterStyle>
);
export default Footer;
