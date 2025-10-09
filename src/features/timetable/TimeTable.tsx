// components/TimetableGrid.tsx
// TimeTable accepts flexible input items. Use a local type to allow either
// legacy { name, text } entries or structured { time, title, location } entries.
type DataItem = {
  name?: string;
  text?: string;
  time?: string; // 'HH:MM' or 'HH:MM-HH:MM'
  title?: string;
  location?: string; // '野外ステージ' | '多目的ホール' (or other)
};

type Place = "野外ステージ" | "多目的ホール";

type Event = {
  place: Place;
  startMin: number; // 分（スロット用の開始時間）
  endMin: number; // 分（スロット用の終了時間）
  actualStartMin: number; // 分（実際の開始時間）
  actualEndMin: number; // 分（実際の終了時間）
  label: string;
};

// FIXME: プログラムの開始時刻や終了時刻は5分刻み？10分刻み？
const SLOT_MIN = 15; // 粒度：15分刻み
const DEFAULT_DURATION = 30; // 終了時刻が無い場合の仮の長さ（分）

// "HH:MM" -> 分
function toMinutes(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((v) => parseInt(v, 10));
  return h * 60 + m;
}

// name 例:
// "10:00@屋外ステージ", "10:25-11:15@野外外ステージ", "10:40-12:30@多目的ホール"
// 空白区切りでもOK: "10:25-11:15 野外ステージ"
function parseName(
  name: string,
): { start: number; end: number; place?: Place } | null {
  const re =
    /^(\d{1,2}:\d{2})(?:\s*[-–]\s*(\d{1,2}:\d{2}))?(?:\s*(?:@|\s+)\s*(野外ステージ|多目的ホール))?$/;
  const m = name.trim().match(re);
  if (!m) return null;

  const [, s, e, p] = m;
  const start = toMinutes(s);
  const end = e ? toMinutes(e) : start + DEFAULT_DURATION;
  const place = p ? (p as Place) : undefined; // 場所が無い場合は undefined を返す

  return { start, end, place };
}

function ceilToSlot(mins: number): number {
  const r = mins % SLOT_MIN;
  return r === 0 ? mins : mins + (SLOT_MIN - r);
}
function floorToSlot(mins: number): number {
  const r = mins % SLOT_MIN;
  return mins - r;
}

function normalize(items: DataItem[]): Event[] {
  return items
    .map((it) => {
      // name may be like '10:00@多目的ホール' or time field may be provided separately
      const rawName = it.name ?? it.time ?? it.text ?? "";
      // Try parse from rawName first. If parsed lacks place, and explicit location exists, try to incorporate it.
      let parsed = parseName(String(rawName));
      if ((!parsed || !parsed.place) && it.time) {
        // try combining time and explicit location, e.g. '10:00@多目的ホール'
        const combined = `${it.time}${it.location ? ` @${it.location}` : ""}`;
        parsed = parseName(combined) || parsed;
      }
      // If parse found times but no place, prefer explicit it.location if it matches expected places
      if (
        parsed &&
        (!parsed.place || parsed.place === undefined) &&
        it.location
      ) {
        const loc = it.location as Place;
        if (loc === "野外ステージ" || loc === "多目的ホール")
          parsed.place = loc;
      }
      if (!parsed) return null;
      const start = floorToSlot(parsed.start);
      const end = Math.max(ceilToSlot(parsed.end), start + SLOT_MIN); // 最低1スロット
      const label = (it.title || it.text || it.name) as string | undefined;
      return {
        place: parsed.place,
        startMin: start, // スロット用（例: 10:30）
        endMin: end, // スロット用（例: 11:00）
        actualStartMin: parsed.start, // 実際の時間（例: 10:35）
        actualEndMin: parsed.end, // 実際の時間（例: 10:55）
        label: label?.trim() || String(rawName),
      } as Event;
    })
    .filter(Boolean) as Event[];
}

function minutesRange(minStart: number, maxEnd: number): number[] {
  const arr: number[] = [];
  for (let t = minStart; t < maxEnd; t += SLOT_MIN) arr.push(t);
  return arr;
}

function fmt(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

type Props = { data: DataItem[]; places?: Place[] }; // 列として出したい場所配列（省略時は ["野外ステージ","多目的ホール"]）

export const TimeTable = ({
  data,
  places = ["野外ステージ", "多目的ホール"],
}: Props) => {
  const events = normalize(data);

  // 表示範囲（全イベントの最小開始～最大終了）
  const minStart = floorToSlot(Math.min(...events.map((e) => e.startMin)));
  const maxEnd = ceilToSlot(Math.max(...events.map((e) => e.endMin)));
  const slots = minutesRange(minStart, maxEnd); // 各行に相当（時間軸）

  // 場所ごとにイベントを時系列で管理
  const eventsByPlace: Record<Place, Event[]> = {
    野外ステージ: [],
    多目的ホール: [],
  };
  for (const e of events) eventsByPlace[e.place].push(e);
  for (const p of places)
    eventsByPlace[p]?.sort((a, b) => a.startMin - b.startMin);

  // 各場所・各スロットが「イベントで覆われているか」を高速に判定するためのマップ
  const coverMap: Record<Place, Record<number, Event | null>> = {
    野外ステージ: {},
    多目的ホール: {},
  };
  for (const p of places) {
    for (const e of eventsByPlace[p] || []) {
      for (let t = e.startMin; t < e.endMin; t += SLOT_MIN) {
        coverMap[p][t] = e;
      }
    }
  }

  // 指定スロットtで「この場所pに新規<td>（=イベント開始セル）を描くべきか」を判定
  function isEventHead(p: Place, t: number): Event | null {
    const ev = coverMap[p][t];
    if (!ev) return null;
    return ev.startMin === t ? ev : null;
  }

  // rowSpanの計算（イベントの長さ / SLOT_MIN）
  function eventRowSpan(ev: Event): number {
    return Math.max(1, (ev.endMin - ev.startMin) / SLOT_MIN);
  }

  return (
    <div className="mb-8 flex justify-center font-dela-one tracking-widest text-lg sm:text-xl">
      <table className="text-center border-separate border-spacing-4">
        <thead>
          <tr>
            <th className="stroke-text text-white bg-umenobe-orange px-2 py-1 sm:px-6 sm:py-3 border border-umenobe-gray">
              時間
            </th>
            {places.map((p) => (
              <th
                key={p}
                className="stroke-text text-white bg-umenobe-orange px-2 py-1 sm:px-6 sm:py-3 border border-umenobe-gray"
              >
                {p}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {slots.map((t) => (
            <tr key={t}>
              {/* 時刻セル（毎行に表示 / 5分刻み） */}
              <td className="text-umenobe-dark-blue bg-umenobe-light-yellow px-2 py-1 border border-umenobe-dark-gray">
                {fmt(t)}
              </td>

              {places
                .filter((p) => {
                  // rowSpanで覆われているセルはスキップ
                  const covered = coverMap[p][t];
                  const head = isEventHead(p, t);
                  return head || !covered;
                })
                .map((p) => {
                  const head = isEventHead(p, t);

                  if (head) {
                    // 新規イベント開始セルを描く
                    return (
                      <td
                        key={p}
                        className="text-umenobe-dark-blue bg-white px-2 py-1 border border-umenobe-dark-gray"
                        rowSpan={eventRowSpan(head)}
                      >
                        <div className="font-medium">{head.label}</div>
                        <div className="text-xs text-gray-600">
                          {fmt(head.actualStartMin)}–{fmt(head.actualEndMin)}
                        </div>
                      </td>
                    );
                  }
                  // 何もないスロットは空セル
                  return (
                    <td
                      key={p}
                      className="align-top text-umenobe-dark-gray bg-umenobe-light-yellow px-2 py-1 border border-umenobe-dark-gray"
                    >
                      -
                    </td>
                  );
                })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
