import { Heading } from '@/components/Heading';
import { Firework } from './Firework';

export default function FireworkPage() {
  return (
    <section className="bg-umenobe-yellow" id="firework">
      <Heading title="打ち上げ花火" />
      <Firework />
    </section>
  );
}
