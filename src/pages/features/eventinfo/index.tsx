import { Heading } from '../../components/Heading';

export default function EventInfoPage() {
  return (
    <section>
      <Heading title="日時・場所" />
      <div className="mb-8 flex justify-center font-dela-one tracking-widest text-2xl">
        <table className="text-center border-separate border-spacing-4">
          <tbody>
            <tr>
              <td className="stroke-text text-white bg-umenobe-orange px-10 py-5 border border-umenobe-gray">
                日時
              </td>
              <td className="text-umenobe-dark-blue bg-umenobe-yellow px-10 py-5 border border-umenobe-gray">
                2025年10月25日（土）
                <br />
                10:00～
              </td>
            </tr>
            <tr>
              <td className="stroke-text text-white bg-umenobe-orange px-10 py-5 border border-umenobe-gray">
                場所
              </td>
              <td className="text-umenobe-dark-blue bg-umenobe-yellow px-10 py-5 border border-umenobe-gray">
                近畿大学工学部
                <br />
                広島キャンパス
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
