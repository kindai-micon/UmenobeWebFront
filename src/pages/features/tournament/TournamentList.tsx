import { JointEvent } from "./JointEvent";
import { Tournament } from "./Tournament";

const imageData = '4e93b89ed6e5439e9ab712b340875ed4.png';
const textData = '大会情報の紹介文が入ります。大会情報の紹介文が入ります。大会情報の紹介文が入ります。';

export const TournamentList = () => {
  return (
  <div>
    <div className="flex justify-center gap-8 mb-8">
        <Tournament imageData={imageData} textData={textData}/>
        <Tournament imageData={imageData} textData={textData}/>
        <Tournament imageData={imageData} textData={textData}/>
        <Tournament imageData={imageData} textData={textData}/>
    </div>
    <div className="flex flex-col items-center gap-8 py-8">
        <JointEvent imageData={imageData} textData={textData} />
        <JointEvent imageData={imageData} textData={textData} />
    </div>
  </div>);
};