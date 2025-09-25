import Image from "next/image";

export const Firework = () => {
  return (
    <div className="flex flex-col items-center pb-8">
        <div className="flex justify-center py-8">
            <div>
                <Image src={"/images/firework.jpg"} alt="打ち上げ花火" width={600} height={400} className="rounded-md" />
            </div>
            <div className="text-center my-4">
                <p className="text-2xl font-bold mb-2">キャッチコピーキャッチコピー</p>
                    
                    <div className="flex flex-col items-start gap-4">
                        {/* {exhibitName && ( */}
                        <p className="tracking-widest">
                            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">観覧場所</span>
                            第3駐車場
                        </p>
                        {/* )} */}
                        {/* {exhibitName && ( */}
                        <p className="tracking-widest">
                            <span className="bg-umenobe-lightblue px-3 py-1 rounded-sm mr-2">開始時刻</span>
                            19:00~
                        </p>
                        {/* )} */}
                    </div>
            </div>
        </div>
        <div className="w-1/2">
            <h2 className="text-2xl font-bold text-center py-8 tracking-widest font-dela-one text-umenobe-dark-blue">
                注意事項
            </h2>
            <p>
                説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
                説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
                説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
                説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
                説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です説明です
            </p>
        </div>
    </div>
  );
}