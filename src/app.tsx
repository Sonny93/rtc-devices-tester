import { ThemeToggle } from '@minimalstuff/ui';
import Footer from '#/components/common/footer';
import SidebarPreview from '#/components/preview/sidebar_preview';
import SidebarSelector from '#/components/selectors/sidebar_selector';

const App = () => (
  <div className="mx-auto flex min-h-svh w-full max-w-7xl flex-col gap-6 p-4">
    <header className="flex items-center justify-between">
      <h1 className="text-3xl font-bold">RTC Devices Tester</h1>
      <ThemeToggle />
    </header>
    <main className="grid grid-cols-12 gap-4">
      <div className="col-span-12 sm:col-span-6 md:col-span-7 lg:col-span-8">
        <SidebarPreview />
      </div>
      <div className="col-span-12 sm:col-span-6 md:col-span-5 lg:col-span-4">
        <SidebarSelector />
      </div>
    </main>
    <Footer />
  </div>
);
export default App;
