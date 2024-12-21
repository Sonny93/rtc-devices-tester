import { Grid, Group, Stack } from '@mantine/core';
import Footer from '~/components/common/footer';
import { ThemeSwitcher } from '~/components/common/theme_switcher';
import SidebarPreview from '~/components/preview/sidebar_preview';
import SidebarSelector from '~/components/selectors/sidebar_selector';
import './app.css';

const App = () => (
  <Stack gap="lg">
    <Group justify="space-between">
      <h1>RTC Devices Tester</h1>
      <ThemeSwitcher />
    </Group>
    <Grid>
      <Grid.Col span={{ base: 12, sm: 6, md: 7, lg: 8 }}>
        <SidebarPreview />
      </Grid.Col>
      <Grid.Col span={{ base: 12, sm: 6, md: 5, lg: 4 }}>
        <SidebarSelector />
      </Grid.Col>
    </Grid>
    <Footer />
  </Stack>
);
export default App;
