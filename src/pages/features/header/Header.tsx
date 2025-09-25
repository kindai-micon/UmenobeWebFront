import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export function Header() {
  return (
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
      <button className="bg-umenobe-orange px-4 py-3 rounded-md border border-umenobe-gray">
        <FontAwesomeIcon icon={faBars} className="text-4xl text-white stroke-umenobe-gray stroke-10" />
      </button>
    </header>
  );
}
