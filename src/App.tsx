import { Group, SimpleGrid, Stack } from '@mantine/core';
import Footer from '~/components/common/footer';
import { ThemeSwitcher } from '~/components/common/theme_switcher';
import SidebarPreview from '~/components/preview/sidebar_preview';
import SidebarSelector from '~/components/selectors/sidebar_selector';
import './App.css';

const App = () => (
  <Stack gap="lg">
    <Group justify="space-between">
      <h1>RTC Devices Tester</h1>
      <ThemeSwitcher />
    </Group>
    <SimpleGrid spacing="lg" cols={2}>
      <SidebarSelector />
      <SidebarPreview />
    </SimpleGrid>
    <Footer />
  </Stack>
);
export default App;
