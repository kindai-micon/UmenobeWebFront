'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);

  const onOverlayClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <div>
      <header className="bg-umenobe-yellow p-2 sm:p-4 flex justify-between items-center">
        <div>
          <div className="bg-umenobe-enpha-orange px-2 inline-block">
            <h2 className="font-dela-one text-md sm:text-2xl tracking-widest text-white stroke-text">
              近畿大学工学部大学祭
            </h2>
          </div>
          <div>
            <h1 className="m-1 font-dela-one text-2xl sm:text-4xl tracking-widest text-umenobe-enpha-orange">
              第67回 うめの辺祭
            </h1>
          </div>
        </div>
        <button
          className="bg-umenobe-orange px-3 py-2 sm:px-4 sm:py-3 rounded-md border border-umenobe-gray"
          onClick={() => {
            setOpen((v) => !v);
          }}
          ref={toggleBtnRef}
          aria-label="メニューを開く"
        >
          <FontAwesomeIcon
            icon={faBars}
            className="text-2xl sm:text-4xl text-white stroke-umenobe-gray stroke-10"
          />
        </button>
      </header>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
          className="fixed inset-0 z-50 bg-black/40"
          onClick={onOverlayClick}
        >
          <div
            id="mobile-drawer"
            ref={panelRef}
            className="absolute right-0 top-0 h-full w-80 max-w-[85%] bg-umenobe-yellow shadow-2xl p-6 transform transition-transform duration-300 ease-in-out"
          >
            <div className="flex items-center justify-between mb-4">
              <div id="mobile-menu-title">
                <div className="bg-umenobe-enpha-orange px-2 inline-block">
                  <h2 className="font-dela-one text-sm tracking-widest text-white stroke-text">
                    近畿大学工学部大学祭
                  </h2>
                </div>
                <div>
                  <h1 className="m-1 font-dela-one text-xl tracking-widest text-umenobe-enpha-orange">
                    第67回 うめの辺祭
                  </h1>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                // className="w-9 h-9 inline-flex items-center justify-center rounded-md border"
                className="bg-umenobe-red px-2 py-1 rounded-md border border-umenobe-gray"
                aria-label="メニューを閉じる"
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-2xl text-white stroke-umenobe-gray stroke-10"
                />
              </button>
            </div>

            <nav className="flex flex-col gap-3">
              <Link
                ref={firstLinkRef}
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#eventinfo"
              >
                日時・場所
              </Link>
              <Link
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#timetable"
              >
                タイムテーブル
              </Link>
              <Link
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#guest"
              >
                ゲスト情報
              </Link>
              <Link
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#tournament"
              >
                イベント
              </Link>
              <Link
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#shop"
              >
                出店
              </Link>
              <Link
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#exhibition"
              >
                展示・発表
              </Link>
              <Link
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#corporation"
              >
                企業・団体様出展
              </Link>
              <Link
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#firework"
              >
                打ち上げ花火
              </Link>
              <Link
                className="font-dela-one tracking-widest text-umenobe-dark-blue text-lg py-2 px-2 rounded hover:bg-umenobe-light-orange focus:outline-none focus:ring"
                onClick={handleLinkClick}
                href="#access"
              >
                交通アクセス
              </Link>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
