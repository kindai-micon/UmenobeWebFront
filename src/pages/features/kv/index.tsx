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
      <h2>近畿大学工学部大学祭</h2>
      <h1>第68回うめの辺祭</h1>
    </section>
  );
}
