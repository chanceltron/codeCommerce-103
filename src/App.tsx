import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';

export function App() {
  return (
    <div className='App font-raleway text-code-gray-700'>
      <Navbar />
      <Hero />
    </div>
  );
}
