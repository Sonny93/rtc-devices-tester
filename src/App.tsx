import 'react-toggle/style.css';
import Footer from '~/components/common/footer';
import SidebarPreview from '~/components/preview/sidebar_preview';
import SidebarSelector from '~/components/selectors/sidebar_selector';
import './App.css';

const App = () => (
  <div className="App">
    <h1>RTC Devices Tester</h1>
    <main>
      <SidebarSelector />
      <SidebarPreview />
    </main>
    <Footer />
  </div>
);
export default App;
