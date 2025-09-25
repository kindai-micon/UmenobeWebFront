import Image from 'next/image';

export default function KeyVisualPage() {
  return (
    <section className="bg-umenobe-yellow">
      {/* TODO: DB反映に変更 */}
      <Image
        src="/appare.jpg"
        alt="大学祭のテーマ画像です"
        width={0}
        height={0}
        sizes="100%"
        style={{ width: '100%', height: 'auto' }}
      />
      <div className="p-5">
        <div className="border border-umenobe-gray bg-umenobe-orange py-1 px-3 inline-block">
          <h2 className="font-dela-one text-4xl tracking-widest text-white stroke-text">
            近畿大学工学部大学祭
          </h2>
        </div>
        <div>
          <h1 className="m-1 font-dela-one text-6xl tracking-widest text-umenobe-orange stroke-text">
            第67回 うめの辺祭
          </h1>
        </div>
      </div>
    </section>
  );
}
