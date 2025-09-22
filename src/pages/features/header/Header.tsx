export function Header() {
  return (
    <header className="bg-umenobe-yellow p-4 flex justify-between items-center">
      <div>
        <div className="border border-umenobe-gray bg-umenobe-orange px-2 inline-block">
          <h2 className="font-dela-one text-2xl tracking-widest text-white title">近畿大学工学部大学祭</h2>
        </div>
        <div>
          <h1 className="m-1 font-dela-one text-4xl tracking-widest title text-umenobe-orange">第68回 うめの辺祭</h1>
        </div>
      </div>
      <div>
        <nav>
          <ul>
            <li>ホーム</li>
            <li>イベント</li>
            <li>アクセス</li>
            <li>お問い合わせ</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
