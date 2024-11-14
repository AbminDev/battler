export const InfoButton = (props: { onClick: () => void }) => {
  return (
    <button
      onClick={props.onClick}
      className="rounded-md p-[2px] bg-[linear-gradient(rgba(255,245,46,1),rgba(255,246,32,1),rgba(255,211,31,1),rgba(252,223,128,1),rgba(255,211,31,1))] w-[28px] h-[30px] border-[#A13412] border-b-2"
    >
      <div className="bg-[linear-gradient(rgba(90,159,170,1),rgba(84,151,161,1),rgba(48,110,120,1),rgba(10,136,152,1))] rounded-[4px] w-[24px] h-[24px] justify-center items-center flex">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.0001 4.48529C10.0153 4.48529 10.8383 3.66229 10.8383 2.64706C10.8383 1.63183 10.0153 0.808823 9.0001 0.808823C7.98487 0.808823 7.16187 1.63183 7.16187 2.64706C7.16187 3.66229 7.98487 4.48529 9.0001 4.48529Z"
            fill="#FFD864"
            stroke="#927801"
            strokeWidth="0.5"
          />
          <path
            d="M8.41187 6.10294C7.72151 6.10294 7.16187 6.66259 7.16187 7.35294V15.9412C7.16187 16.6315 7.72151 17.1912 8.41187 17.1912H9.58834C10.2787 17.1912 10.8383 16.6315 10.8383 15.9412V7.35294C10.8383 6.66259 10.2787 6.10294 9.58833 6.10294H8.41187Z"
            fill="#FFD864"
            stroke="#927801"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </button>
  );
};
