import { WebSocketProvider } from './providers/WebSocketProvider';

import './App.css';
import Spoke from './components/Spoke';
import Hub from './components/Hub';

const serverIp: string = import.meta.env.VITE_SERVER_IP;
const searchParams = new URLSearchParams(window.location.search);
const isHub: boolean = searchParams.has('hub');

function App() {

  const content = isHub ? <Hub /> : <Spoke />;

  return (
    <WebSocketProvider url={serverIp}>
      {content}
    </WebSocketProvider>
  );
}

export default App;
