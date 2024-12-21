import { Container, Group } from '@mantine/core';
import Footer from '~/components/common/footer';
import SidebarPreview from '~/components/preview/sidebar_preview';
import SidebarSelector from '~/components/selectors/sidebar_selector';
import './App.css';

const App = () => (
  <Container>
    <h1>RTC Devices Tester</h1>
    <Group gap="md">
      <SidebarSelector />
      <SidebarPreview />
    </Group>
    <Footer />
  </Container>
);
export default App;
