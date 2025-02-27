export const BackButton = (props: { onClick: () => void }) => {
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
            d="M12.2221 3.60802L12.2222 3.60799C12.4799 3.35014 12.6248 3.00047 12.6248 2.63587C12.6248 2.27127 12.4799 1.92159 12.2222 1.66374L12.2221 1.66369C11.9643 1.40592 11.6146 1.26111 11.25 1.26111C10.8854 1.26111 10.5357 1.40592 10.2779 1.66369L10.2778 1.66372L3.91372 8.02784L3.91369 8.02787C3.65592 8.28572 3.51111 8.63539 3.51111 8.99999C3.51111 9.36459 3.65592 9.71427 3.91369 9.97212L3.91372 9.97215L10.2778 16.3363L10.2778 16.3363L10.2809 16.3393C10.5403 16.5898 10.8876 16.7284 11.2481 16.7252C11.6086 16.7221 11.9535 16.5775 12.2084 16.3226C12.4634 16.0676 12.608 15.7228 12.6111 15.3622C12.6142 15.0017 12.4757 14.6544 12.2252 14.3951L12.2252 14.395L12.2221 14.392L6.83017 8.99999L12.2221 3.60802Z"
            fill="#FFD864"
            stroke="#927801"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    </button>
  );
};
