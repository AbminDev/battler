interface ProgressBarProps {
  progress: string;
  lvl: number;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { progress, lvl } = props;

  return (
    <div className="flex-row flex items-center pt-4">
      <div className="ml-16 items-center justify-center flex">
        <svg className="z-[2]" width="36" height="40" viewBox="0 0 36 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.3751 1.98157C16.9995 1.04375 19.0007 1.04375 20.6251 1.98158L32.292 8.71748C33.9164 9.6553 34.917 11.3885 34.917 13.2641V26.7359C34.917 28.6116 33.9164 30.3447 32.292 31.2825L20.6251 38.0184C19.0007 38.9563 16.9995 38.9563 15.3751 38.0184L3.70818 31.2825C2.08382 30.3447 1.08318 28.6115 1.08318 26.7359V13.2641C1.08318 11.3885 2.08382 9.6553 3.70818 8.71747L15.3751 1.98157Z" fill="white" stroke="url(#paint0_linear_59_9377)" strokeWidth="1.5"/>
          <defs>
            <linearGradient id="paint0_linear_59_9377" x1="18.0001" y1="-0.399994" x2="18.0001" y2="40.4" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F09E00"/>
            <stop offset="0.943965" stopColor="#D14700"/>
            <stop offset="1" stopColor="#A13412"/>
            </linearGradient>
          </defs>
        </svg>
        <p className="text-[#BC3E08] absolute z-[3] text-[21.6px] font-black">{lvl}</p>
      </div>
      <div className="h-4 p-px ml-[-8px] flex-1 bg-border-button-gradient mr-16 rounded-3xl">
        <div className="h-[14px] flex-1 bg-[#453221] rounded-[23px]">
          <div
            className={`h-[14px] bg-[#5FE971] w-${progress} rounded-3xl`}
          />
        </div>
      </div>
    </div>
  );
};
