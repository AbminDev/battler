// components/QuestBlockInnerSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const QuestBlockInnerSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col gap-2 w-full bg-[#584d3c] rounded-md ">
      <div className="flex items-center gap-4 w-full">
        {/* Скелет для зображення */}
        <Skeleton
          circle={true}
          height={40}
          width={40}
          baseColor="#362d28"
          highlightColor="#584d3c"
          className="ml-2"
        />

        {/* Скелет для тексту та іконки */}
        <div className="flex flex-col flex-grow gap-1 pt-1">
          <Skeleton
            height={20}
            width={`80%`}
            baseColor="#362d28"
            highlightColor="#584d3c"
          />
          <div className="flex items-center space-x-1">
            <Skeleton
              circle={true}
              height={12}
              width={12}
              baseColor="#362d28"
              highlightColor="#584d3c"
            />
            <Skeleton
              height={12}
              width={30}
              baseColor="#362d28"
              highlightColor="#584d3c"
            />
          </div>
        </div>

        {/* Скелет для кнопки */}
        <Skeleton
          height={40}
          width={60}
          borderRadius={4}
          baseColor="#362d28"
          highlightColor="#584d3c"
          className="mr-2"
        />
      </div>
    </div>
  );
};
