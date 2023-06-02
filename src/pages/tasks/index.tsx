import type { ReactElement } from 'react';
import { Tasks } from '@/tasks/components/tasks';
// import { Disclaimer } from '@/tasks/components/disclaimer';

export const TasksPage = (): ReactElement => {
  return (
    <div className="flex flex-col items-center py-8 text-white bg-[#212332] min-h-screen w-full p-[100px] pt-[150px]">
      <div className="bg-[#2A2D3E] flex-1 w-full flex flex-col items-center  p-[40px]">
        {/* <Disclaimer /> */}

        <div className="mt-[8rem] w-full">
          <div className="font-extrabold text-white text-base">
            <div>TODAY</div>
          </div>

          <div className="mt-[72px]">
            <Tasks />
          </div>
        </div>
      </div>

      <div className="h-[10rem]" />
    </div>
  );
};
