import { Header } from './components/Header';
import KeyVisualPage from './features/kv';

export default function Page() {
  return (
    <div>
      <Header />

      <main>
        <KeyVisualPage />
      </main>
    </div>
  );
}
