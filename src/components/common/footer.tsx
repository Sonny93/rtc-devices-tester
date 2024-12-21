import packageJson from '@/package.json';
import { Anchor, Group, Text } from '@mantine/core';
import ExternalLink from '~/components/common/external_link';

const Footer = () => (
  <Group gap={4} c="dimmed" justify="center" mt="auto">
    <Text size="sm">Made with ❤️ by</Text>{' '}
    <Anchor size="sm" component={ExternalLink} href="https://www.sonny.dev/">
      Sonny
    </Anchor>
    {' • '}
    <Anchor
      size="sm"
      component={ExternalLink}
      href="https://github.com/Sonny93/rtc-devices-tester"
    >
      {packageJson.version}
    </Anchor>
  </Group>
);
export default Footer;
