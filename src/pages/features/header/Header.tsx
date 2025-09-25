"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  return (
    <div>
      <header className="bg-umenobe-yellow p-4 flex justify-between items-center">
        <div>
          <div className="border border-umenobe-gray bg-umenobe-orange px-2 inline-block">
            <h2 className="font-dela-one text-2xl tracking-widest text-white stroke-text">
              近畿大学工学部大学祭
            </h2>
          </div>
          <div>
            <h1 className="m-1 font-dela-one text-4xl tracking-widest text-umenobe-orange stroke-text">
              第67回 うめの辺祭
            </h1>
          </div>
        </div>
        <button 
          className="bg-umenobe-orange px-4 py-3 rounded-md border border-umenobe-gray"
          onClick={() => {setOpen((v) => !v);}}
          ref={toggleBtnRef}
          aria-label='メニューを開く'
          >
          <FontAwesomeIcon
            icon={faBars}
            className="text-4xl text-white stroke-umenobe-gray stroke-10"
          />
        </button>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          className="fixed inset-0 z-50 bg-black/40"
        >
          <div
            id="mobile-drawer"
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-white shadow-2xl p-6 transform transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 id="mobile-menu-title" className="text-lg font-semibold">メニュー</h2>
              <button
                onClick={() => setOpen(false)}
                className="w-9 h-9 inline-flex items-center justify-center rounded-md border"
                aria-label="メニューを閉じる"
              >
                <FontAwesomeIcon icon={faXmark} className="text-4xl text-black" />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              <a ref={firstLinkRef} className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#keyvisual">キービジュアル</a>
              <a className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#eventinfo">イベント情報</a>
              <a className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#timetable">タイムテーブル</a>
              <a className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#guest">ゲスト</a>
              <a className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#tournament">トーナメント</a>
              <a className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#shop">ショップ</a>
              <a className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#exhibition">展示</a>
              <a className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#corporation">協賛</a>
              <a className="py-2 px-2 rounded hover:bg-gray-100 focus:outline-none focus:ring" href="#access">アクセス</a>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
