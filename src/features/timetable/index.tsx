import { Heading } from "@/components/Heading";
import { TextItem } from "@/types/type";
import { useEffect, useState } from "react";
import { TimeTable } from "./TimeTable";

type Props = {
  textData: TextItem[];
};

export default function TimeTablePage({ textData }: Props) {
  const [timetable, setTimeTable] = useState<
    { time?: string; title?: string; location?: string }[]
  >([]);

  useEffect(() => {
    const data = textData.filter((item) => item.name.startsWith("schedule"));

    // グループを作成: schedule_<type>_<num> 形式を解析して、num ごとに type をキーに格納する
    const groups: Record<string, Record<string, string>> = {};
    for (const item of data) {
      const m = item.name.match(/^schedule_([a-zA-Z0-9]+)_(\d+)$/);
      if (!m) continue;
      const [, type, num] = m;
      if (!groups[num]) groups[num] = {};
      groups[num][type] = item.text;
    }

    // 結果を配列化（id は生成せず、time/title/location のみを含む配列にする）
    const nums = Object.keys(groups).sort((a, b) => Number(a) - Number(b));
    const result = nums.map((n) => ({
      time: groups[n].time,
      title: groups[n].title,
      location: groups[n].location,
    }));
    setTimeTable(result);
  }, [textData]);

  return (
    <section className="bg-umenobe-yellow pb-8" id="timetable">
      <Heading title="タイムテーブル" />
      <TimeTable data={timetable} />
    </section>
  );
}
