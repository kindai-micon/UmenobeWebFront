import { Header } from './features/header/Header';
import KeyVisualPage from './features/kv';
import EventInfoPage from './features/eventinfo';
import TimeTablePage from './features/timetable';
import TournamentPage from './features/tournament';
import ShopPage from './features/shop';
import ExhibitionPage from './features/exhibition';
import CorporationPage from './features/corporation';
import AccessPage from './features/access';
import GuestPage from './features/guest';

export default function Page() {
  return (
    <div>
      <Header />

      <div>
        <KeyVisualPage />
        <EventInfoPage />
        <TimeTablePage />
        <GuestPage />
        <TournamentPage />
        <ShopPage />
        <ExhibitionPage />
        <CorporationPage />
        <AccessPage />
      </div>
    </div>
  );
}
