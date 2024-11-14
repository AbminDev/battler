import React, { useState } from "react";

export const RefreshFriends = () => {
  const [isRotating, setIsRotating] = useState(false);

  const handleRefreshClick = () => {
    console.log("here");
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 1000);
  };

  return (
    <div className="w-full h-6 justify-between items-center inline-flex pb-2">
      <div className="text-white text-base font-normal leading-tight">
        Your friends list
      </div>

      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="11.5" fill="#121214" stroke="#464644" />
        <g clip-path="url(#clip0_5490_33752)">
          <path
            d="M9.96345 16.5062H10.4992V12.6367H9.96345C9.66757 12.6367 9.42773 12.3969 9.42773 12.101V10.8215C9.42773 10.5256 9.66757 10.2857 9.96345 10.2857H12.9634C13.2593 10.2857 13.4992 10.5256 13.4992 10.8215V16.5062H14.0349C14.3308 16.5062 14.5706 16.746 14.5706 17.0419V18.3215C14.5706 18.6173 14.3308 18.8572 14.0349 18.8572H9.96345C9.66757 18.8572 9.42773 18.6173 9.42773 18.3215V17.0419C9.42773 16.746 9.66757 16.5062 9.96345 16.5062ZM11.9992 5.14288C10.934 5.14288 10.0706 6.00632 10.0706 7.07145C10.0706 8.13659 10.934 9.00003 11.9992 9.00003C13.0643 9.00003 13.9277 8.13659 13.9277 7.07145C13.9277 6.00632 13.0643 5.14288 11.9992 5.14288Z"
            fill="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_5490_33752">
            <rect
              width="5.14286"
              height="13.7143"
              fill="white"
              transform="translate(9.42773 5.14288)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};
