import styled from '@emotion/styled';
import 'react-toggle/style.css';
import Footer from '~/components/common/footer';
import SidebarPreview from '~/components/preview/sidebar_preview';
import SidebarSelector from '~/components/selectors/sidebar_selector';
import './App.css';

const Container = styled.div(({ theme }) => ({
  marginTop: '8em',
  display: 'flex',
  gap: '2em',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',

  [`@media (max-width: ${theme.medias.mobile})`]: {
    marginTop: '1.25em',
  },
}));

const Content = styled.main(({ theme }) => ({
  display: 'flex',
  flex: 1,
  gap: '3em',
  justifyContent: 'center',

  [`@media (max-width: ${theme.medias.mobile})`]: {
    flexDirection: 'column-reverse',
  },
}));

const App = () => (
  <Container>
    <h1>RTC Devices Tester</h1>
    <Content>
      <SidebarSelector />
      <SidebarPreview />
    </Content>
    <Footer />
  </Container>
);
export default App;
