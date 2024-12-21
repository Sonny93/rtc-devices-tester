import packageJson from '@/package.json';
import { Anchor, Group, Text } from '@mantine/core';
import ExternalLink from '~/components/common/external_link';

const Footer = () => (
  <Group>
    <Text>Made with ❤️ by</Text>{' '}
    <Anchor component={ExternalLink} href="https://www.sonny.dev/">
      Sonny
    </Anchor>
    {' • '}
    <Text>
      Version:{' '}
      <Anchor
        component={ExternalLink}
        href="https://github.com/Sonny93/rtc-devices-tester"
      >
        {packageJson.version}
      </Anchor>
    </Text>
  </Group>
);
export default Footer;
