export function TopButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 bg-umenobe-red text-white px-4 py-2 rounded-full font-dela-one shadow-sm hover:bg-umenobe-dark-orange transition"
      aria-label="トップへ戻る"
    >
      ↑
    </button>
  );
}
