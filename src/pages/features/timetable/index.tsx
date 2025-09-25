import { Heading } from '../../components/Heading';
import { TimeTable } from './TimeTable';

// FIXME: 繋ぎこみ
const data = [
  { name: '10:00-10:30@野外ステージ', text: '受付' },
  { name: '10:35-10:55@野外ステージ', text: '基調講演' },
  { name: '10:40-12:30@多目的ホール', text: 'ワークショップ' },
  { name: '11:25-11:50@野外ステージ', text: 'デモ' },
  { name: '12:00-12:30@野外ステージ', text: 'Q&A' },
  { name: '10:00@多目的ホール', text: 'オープン' },
  { name: '12:40@多目的ホール', text: 'オープン' },
];

export default function TimeTablePage() {
  return (
    <section className="bg-umenobe-yellow pb-8" id='timetable'>
      <Heading title="タイムテーブル" />
      <TimeTable data={data} />
    </section>
  );
}
