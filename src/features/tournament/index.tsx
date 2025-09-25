import { Heading } from '@/components/Heading';
import { TournamentList } from './TournamentList';

export default function Page() {
  return (
    <section className="bg-umenobe-yellow" id='tournament'>
      <Heading title="イベント" />
      <TournamentList />
    </section>
  );
}
