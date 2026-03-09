import Navbar from './components/Navbar';
import ChatWidget from './components/ChatWidget';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <>
      <Navbar />
      <AppRouter />
      <ChatWidget />
    </>
  );
}

export default App;
