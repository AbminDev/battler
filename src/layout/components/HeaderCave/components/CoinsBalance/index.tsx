import { KeysIco } from "../../../HeaderFarm/components";

export const CoinsBalance: React.FC<{ goldAmount: number }> = ({
  goldAmount,
}) => {
  return (
    <div className="flex justify-center items-center px-2 h-10 bg-neutral-950 rounded-sm ml-4">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.0006 22.8C17.9653 22.8 22.8006 17.9647 22.8006 12C22.8006 6.0353 17.9653 1.19998 12.0006 1.19998C6.03591 1.19998 1.20059 6.0353 1.20059 12C1.20059 17.9647 6.03591 22.8 12.0006 22.8Z"
          fill="#FFD540"
          stroke="black"
          strokeWidth="0.8"
        />
        <g>
          <path
            d="M22.4077 11.9999C22.4077 17.7455 17.7499 22.4072 12.0004 22.4072C9.39266 22.4072 7.0088 21.445 5.18262 19.8623C6.83207 20.7381 8.71324 21.229 10.7083 21.229C16.5599 21.229 21.4219 16.9915 22.3919 11.4187C22.4037 11.6111 22.4077 11.8036 22.4077 11.9999Z"
            fill="#F15A24"
          />
        </g>
        <g>
          <path
            d="M15.6997 2.27207C15.201 2.22102 14.6944 2.19352 14.1838 2.19352C8.91733 2.19352 4.32635 5.08793 1.92285 9.37652C3.0814 4.89942 7.15399 1.59265 11.9963 1.59265C13.3002 1.59265 14.5491 1.83222 15.6997 2.27207Z"
            fill="white"
          />
        </g>
        <path
          d="M12.0862 20.3337C16.641 20.3337 20.3334 16.6412 20.3334 12.0864C20.3334 7.53155 16.641 3.83911 12.0862 3.83911C7.5313 3.83911 3.83887 7.53155 3.83887 12.0864C3.83887 16.6412 7.5313 20.3337 12.0862 20.3337Z"
          fill="#EBA233"
          stroke="#FCEE21"
          strokeWidth="0.4"
        />
        <path
          d="M18.9742 16.261C19.5868 15.126 19.9324 13.8261 19.9324 12.4437C19.9324 7.99802 16.3311 4.39278 11.8815 4.39278C8.97141 4.39278 6.42261 5.9362 5.00879 8.24937C6.37155 5.73984 9.03032 4.0354 12.0857 4.0354C16.5353 4.0354 20.1367 7.64064 20.1367 12.0863C20.1367 13.614 19.7125 15.0436 18.9742 16.261Z"
          fill="#EC9140"
        />
        <path
          d="M20.7775 6.40762C14.3761 9.30595 8.98784 14.0501 5.29227 19.9567C3.03016 18.0481 1.59277 15.189 1.59277 12.0001C1.59277 6.25052 6.25445 1.59277 12.0001 1.59277C15.6917 1.59277 18.9317 3.50928 20.7775 6.40762Z"
          fill="url(#paint0_radial_596_6421)"
        />
        <defs>
          <radialGradient
            id="paint0_radial_596_6421"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(12.1385 13.9029) rotate(-108.14) scale(13.8711 29.8495)"
          >
            <stop offset="0.416941" stopColor="white" />
            <stop offset="0.654304" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
      <div className="text-center text-white ml-1 text-xl font-normal leading-tight">
        {goldAmount}
      </div>
    </div>
  );
};

export const KeysBalance: React.FC<{ keys: number }> = ({ keys }) => {
  return (
    <div className="flex justify-center items-center px-2 h-10 bg-neutral-950 rounded-sm ml-4">
      <div className="w-6 h-6">
        <KeysIco />
      </div>
      <div className="text-center text-white ml-1 text-xl font-normal leading-tight">
        {keys}
      </div>
    </div>
  );
};
