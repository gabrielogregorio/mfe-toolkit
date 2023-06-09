/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ReactElement } from 'react';
import { useContext, useEffect, useRef, useState } from 'react';
import { Tasks } from '@/tasks/components/tasks';
import { TaskContext } from '@/tasks/contexts/taskContext';
import type { ITask } from '@/tasks/types';
import { TaskStatusEnum } from '@/tasks/types';
import {
  Breadcrumb,
  ButtonWithSound,
  NavigationLevel,
  NavigationSpace,
  TextLarge,
  TextVariantEnum,
  useCopyToClipboard,
  useHandleKeyboard,
  useOutsideClick,
  useReadFromClipboard,
} from 'ogregorio-component-library-studies';
import { useNavigate } from 'react-router-dom';
import { ReturnToHome } from '@/common/returnToHome';
import { downloadFile } from '@/common/downloadContent';
import Bg1 from '../bg1.webp';

export const TasksPage = (): ReactElement => {
  const [copyIsOpen, setCopyIsOpen] = useState<boolean>(false);
  const refOptions = useRef<HTMLDivElement>(null);
  const { tasks, handleAddBatchNewTasks } = useContext(TaskContext);
  const { copy } = useCopyToClipboard();
  const { readClipboard } = useReadFromClipboard();
  const [errorOnPastToClipboard, setErrorOnPastToClipboard] = useState<string>('');
  const [content, setContent] = useState(``);

  const navigate = useNavigate();

  useHandleKeyboard((key) => {
    if (key === 'Escape') {
      navigate('/');
    }
  });

  const { clickedOutside } = useOutsideClick(refOptions);
  useEffect(() => {
    setCopyIsOpen(false);
  }, [clickedOutside]);

  const handleDownloadLocalstorage = (): void => {
    // eslint-disable-next-line no-magic-numbers
    const dataStorage = JSON.stringify(tasks, undefined, 2);
    const fileName = `backup-tasks-${new Date().getTime().toString()}json`;

    downloadFile(dataStorage, fileName, { type: 'application/json' });
  };

  const handleCopyToClipboard = (): void => {
    // eslint-disable-next-line no-magic-numbers
    const dataStorage = JSON.stringify(tasks, undefined, 2);
    copy(dataStorage);
  };

  const handlePastToClipboard = async (contentTasks: string): Promise<void> => {
    let errorLine = 0;
    let errorCause = '';
    const newTasksHandled: ITask[] = [];
    try {
      const possibleTasks: ITask[] = JSON.parse(contentTasks);
      possibleTasks.forEach((task, index) => {
        const possibleDescription = task.description;
        if (typeof possibleDescription !== 'string') {
          errorLine = index + 1;
          errorCause = 'description is invalid';
          throw new Error('');
        }

        const availableStatus = [TaskStatusEnum.available, TaskStatusEnum.completed, TaskStatusEnum.disabled];

        if (!availableStatus.includes(task.status)) {
          errorLine = index + 1;
          errorCause = `status is invalid "${task.status}", only "${JSON.stringify(availableStatus)}"`;
          throw new Error('');
        }

        newTasksHandled.push({
          description: possibleDescription,
          id: `${index}${new Date().getTime().toString()}`,
          status: task.status,
        });
      });

      // eslint-disable-next-line no-console
      console.log(newTasksHandled);
      handleAddBatchNewTasks(newTasksHandled);
    } catch (error: unknown) {
      setErrorOnPastToClipboard(`Error on copy item on line '${errorLine}', error ${errorCause}`);
    }
  };

  return (
    <div className="relative min-h-[100vh] max-h-[100vh] h-full max-w-[100vw] w-full">
      <div className="absolute h-screen w-screen top-0 left-0 z-10">
        <img src={Bg1} className="w-[100vw] h-[100vh] object-cover" alt="" />
      </div>

      {errorOnPastToClipboard ? (
        <div className="top-0 left-0 absolute z-50 w-screen h-screen flex items-center justify-center animate-fadeInDrop">
          <div className="bg-black/70 text-white shadow-default px-[1rem] py-[1rem] rounded-[3px] border-2 border-white animate-fadeIn">
            <TextLarge>{errorOnPastToClipboard}</TextLarge>

            <div className="mt-[15px] flex items-center justify-end">
              <ButtonWithSound
                content="OK"
                onClick={() => {
                  setErrorOnPastToClipboard('');
                }}
              />

              <span className="ml-[9px]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-[16px] h-auto rotate-180">
                  <path
                    d="M21.75 12C21.75 9.41414 20.7228 6.93419 18.8943 5.10571C17.0658 3.27723 14.5859 2.25 12 2.25C9.41414 2.25 6.93419 3.27723 5.10571 5.10571C3.27723 6.93419 2.25 9.41414 2.25 12C2.25 14.5859 3.27723 17.0658 5.10571 18.8943C6.93419 20.7228 9.41414 21.75 12 21.75C14.5859 21.75 17.0658 20.7228 18.8943 18.8943C20.7228 17.0658 21.75 14.5859 21.75 12ZM0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12Z"
                    fill="white"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      ) : undefined}
      <div className="absolute h-screen w-screen max-h-screen max-w-screen top-0 left-0 z-20 bg-black/80 animate-fadeInDrop transition-all duration-200 pt-[80px] px-[90px] flex flex-col">
        <Breadcrumb content="TASKS" />

        <div className="flex gap-6 mt-[64px] animate-fadeIn  max-h-full overflow-y-hidden px-[2rem]">
          <div className="flex-1 overflow-y-scroll scrollbar">
            <div>
              <NavigationSpace>
                <ButtonWithSound isActive content="CONFIGURAÇÕES" variant={TextVariantEnum.basicItemMenu} />
              </NavigationSpace>

              <NavigationLevel level={1}>
                <NavigationSpace>
                  <div className="flex items-center justify-between text-white max-w-[620px] w-full">
                    <ButtonWithSound
                      content="DOWNLOAD BACKUP"
                      variant={TextVariantEnum.basicItemMenu}
                      onClick={() => handleDownloadLocalstorage()}
                    />

                    <div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[30px] h-auto">
                        <path
                          d="M7.875 0.875C7.875 0.391016 7.48398 0 7 0C6.51602 0 6.125 0.391016 6.125 0.875V7.51133L4.11797 5.5043C3.77617 5.1625 3.22109 5.1625 2.8793 5.5043C2.5375 5.84609 2.5375 6.40117 2.8793 6.74297L6.3793 10.243C6.72109 10.5848 7.27617 10.5848 7.61797 10.243L11.118 6.74297C11.4598 6.40117 11.4598 5.84609 11.118 5.5043C10.7762 5.1625 10.2211 5.1625 9.8793 5.5043L7.875 7.51133V0.875ZM1.75 9.625C0.784766 9.625 0 10.4098 0 11.375V12.25C0 13.2152 0.784766 14 1.75 14H12.25C13.2152 14 14 13.2152 14 12.25V11.375C14 10.4098 13.2152 9.625 12.25 9.625H9.47461L8.23594 10.8637C7.55234 11.5473 6.44492 11.5473 5.76133 10.8637L4.52539 9.625H1.75ZM11.8125 11.1562C11.9865 11.1562 12.1535 11.2254 12.2765 11.3485C12.3996 11.4715 12.4688 11.6385 12.4688 11.8125C12.4688 11.9865 12.3996 12.1535 12.2765 12.2765C12.1535 12.3996 11.9865 12.4688 11.8125 12.4688C11.6385 12.4688 11.4715 12.3996 11.3485 12.2765C11.2254 12.1535 11.1562 11.9865 11.1562 11.8125C11.1562 11.6385 11.2254 11.4715 11.3485 11.3485C11.4715 11.2254 11.6385 11.1562 11.8125 11.1562Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </NavigationSpace>

                <NavigationSpace>
                  <div className="flex items-center justify-between text-white max-w-[620px] w-full">
                    <ButtonWithSound
                      variant={TextVariantEnum.basicItemMenu}
                      content="COPIAR BACKUP"
                      onClick={() => handleCopyToClipboard()}
                    />

                    <div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[30px] h-auto">
                        <path
                          d="M7.4375 0H10.8309C11.1781 0 11.5117 0.139453 11.7578 0.385547L13.6145 2.24219C13.8605 2.48828 14 2.82188 14 3.16914V9.1875C14 9.91211 13.4121 10.5 12.6875 10.5H7.4375C6.71289 10.5 6.125 9.91211 6.125 9.1875V1.3125C6.125 0.587891 6.71289 0 7.4375 0ZM1.3125 3.5H5.25V5.25H1.75V12.25H7V11.375H8.75V12.6875C8.75 13.4121 8.16211 14 7.4375 14H1.3125C0.587891 14 0 13.4121 0 12.6875V4.8125C0 4.08789 0.587891 3.5 1.3125 3.5Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </NavigationSpace>

                <NavigationSpace>
                  <div className="flex items-center justify-between text-white max-w-[620px] w-full">
                    <ButtonWithSound
                      variant={TextVariantEnum.basicItemMenu}
                      content="CARREGAR BACKUP"
                      onClick={() => {
                        readClipboard()
                          .then((data) => {
                            return handlePastToClipboard(data);
                          })
                          .catch((error) => {
                            //
                          });
                      }}
                    />

                    <div>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-[30px] h-auto">
                        <path
                          d="M5 0C4.25938 0 3.6125 0.403125 3.26875 1H1.5C0.671875 1 0 1.67188 0 2.5V12.5C0 13.3281 0.671875 14 1.5 14H6V5.5C6 4.11875 7.11875 3 8.5 3H10V2.5C10 1.67188 9.32812 1 8.5 1H6.73125C6.3875 0.403125 5.74062 0 5 0ZM8.5 4C7.67188 4 7 4.67188 7 5.5V14V14.5C7 15.3281 7.67188 16 8.5 16H14.5C15.3281 16 16 15.3281 16 14.5V7.62187C16 7.225 15.8406 6.84375 15.5594 6.5625L13.4375 4.44063C13.1562 4.15938 12.775 4 12.3781 4H10H8.5ZM5 1.25C5.19891 1.25 5.38968 1.32902 5.53033 1.46967C5.67098 1.61032 5.75 1.80109 5.75 2C5.75 2.19891 5.67098 2.38968 5.53033 2.53033C5.38968 2.67098 5.19891 2.75 5 2.75C4.80109 2.75 4.61032 2.67098 4.46967 2.53033C4.32902 2.38968 4.25 2.19891 4.25 2C4.25 1.80109 4.32902 1.61032 4.46967 1.46967C4.61032 1.32902 4.80109 1.25 5 1.25Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                  </div>
                </NavigationSpace>
              </NavigationLevel>

              <NavigationSpace>
                <ButtonWithSound isActive variant={TextVariantEnum.basicItemMenu} content="MINHAS TAREFAS" />
              </NavigationSpace>

              <NavigationLevel level={1}>
                <Tasks />
              </NavigationLevel>
            </div>

            <div className="h-[5rem]" />
          </div>
        </div>

        <ReturnToHome />
      </div>
    </div>
  );
};

//     <div className="flex flex-col items-center py-8 text-white bg-[#212332] min-h-screen w-full p-[100px] pt-[150px]">
//       <div className="bg-[#2A2D3E] flex-1 w-full flex flex-col items-center  p-[40px]">

//         <div className="mt-[8rem] w-full">
//           <div className="font-extrabold  flex items-center">
//             <div className="text-white text-[14px]">TODAY</div>

//             <div className="flex items-center ml-[80px]">
//

//               <button
//                 type="button"
//                 aria-label="copiar para área de trabalho"
//                 onClick={(): void => handleCopyToClipboard()}
//                 className="ml-[22px] transition-all duration-100 shadow-xl">
//                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <g clipPath="url(#clip0_104_73)">
//                     <path
//                       d="M7.4375 0H10.8309C11.1781 0 11.5117 0.139453 11.7578 0.385547L13.6145 2.24219C13.8605 2.48828 14 2.82188 14 3.16914V9.1875C14 9.91211 13.4121 10.5 12.6875 10.5H7.4375C6.71289 10.5 6.125 9.91211 6.125 9.1875V1.3125C6.125 0.587891 6.71289 0 7.4375 0ZM1.3125 3.5H5.25V5.25H1.75V12.25H7V11.375H8.75V12.6875C8.75 13.4121 8.16211 14 7.4375 14H1.3125C0.587891 14 0 13.4121 0 12.6875V4.8125C0 4.08789 0.587891 3.5 1.3125 3.5Z"
//                       fill="white"
//                     />
//                   </g>
//                   <defs>
//                     <clipPath id="clip0_104_73">
//                       <rect width="14" height="14" fill="white" />
//                     </clipPath>
//                   </defs>
//                 </svg>
//               </button>

//               <div className="w-[49px] " />

//               <div className="relative" ref={refOptions}>
//                 <button
//                   type="button"
//                   onClick={(): void => setCopyIsOpen((prev) => !prev)}
//                   className="flex items-center py-[10px] px-[16px] hover:bg-[#2F3241] shadow-xl transition-all duration-100 bg-[#212332] text-white rounded-[3px]">
//                   <span>
//                     <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                       <path
//                         d="M7.875 2.98799V9.62432C7.875 10.1083 7.48398 10.4993 7 10.4993C6.51602 10.4993 6.125 10.1083 6.125 9.62432V2.98799L4.11797 4.99502C3.77617 5.33682 3.22109 5.33682 2.8793 4.99502C2.5375 4.65322 2.5375 4.09814 2.8793 3.75635L6.3793 0.256348C6.72109 -0.0854492 7.27617 -0.0854492 7.61797 0.256348L11.118 3.75635C11.4598 4.09814 11.4598 4.65322 11.118 4.99502C10.7762 5.33682 10.2211 5.33682 9.8793 4.99502L7.875 2.98799ZM1.75 9.62432H5.25C5.25 10.5896 6.03477 11.3743 7 11.3743C7.96523 11.3743 8.75 10.5896 8.75 9.62432H12.25C13.2152 9.62432 14 10.4091 14 11.3743V12.2493C14 13.2146 13.2152 13.9993 12.25 13.9993H1.75C0.784766 13.9993 0 13.2146 0 12.2493V11.3743C0 10.4091 0.784766 9.62432 1.75 9.62432ZM11.8125 12.4681C11.9865 12.4681 12.1535 12.3989 12.2765 12.2759C12.3996 12.1528 12.4688 11.9859 12.4688 11.8118C12.4688 11.6378 12.3996 11.4708 12.2765 11.3478C12.1535 11.2247 11.9865 11.1556 11.8125 11.1556C11.6385 11.1556 11.4715 11.2247 11.3485 11.3478C11.2254 11.4708 11.1562 11.6378 11.1562 11.8118C11.1562 11.9859 11.2254 12.1528 11.3485 12.2759C11.4715 12.3989 11.6385 12.4681 11.8125 12.4681Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </span>

//                   <span className="font-semibold text-[14px] text-white ml-[18px]">upload</span>
//                 </button>

//                 {copyIsOpen ? (
//                   <div className="absolute bg-[#2F3241] min-w-[354px] flex flex-col items-start z-[50] rounded-[3px] left-0 mt-2">
//                     <h4 className="py-[14px] px-[8px] text-center w-full text-base font-semibold relative">
//                       <span>Copie e cole os dados</span>

//                       <button
//                         type="button"
//                         onClick={(): void => setCopyIsOpen(false)}
//                         className="text-[16px] font-semibold text-white absolute right-[8px] pr-[8px] pl-[40px]">
//                         x
//                       </button>
//                     </h4>

//                     <div className="border-b border-[#A9A9A9] w-full" />

//                     <div className="mx-[11px] mt-[24px]">
//                       <div className=" relative">
//                         <textarea
//                           name="content"
//                           id="content"
//                           className="text-[14px] py-[12px] px-[12px] font-normal bg-transparent w-[365px] h-[245px] focus:outline-[#212332]  border border-[#A9A9A9] rounded-[3px]"
//                           cols={30}
//                           rows={10}
//                           value={content}
//                           onChange={(event): void => handleChange(event.target.value)}
//                           placeholder={`[
//   {
//     // Cole aqui o conteudo
//   }
// ]`}
//                         />

//                         <button
//                           type="button"
//                           className="absolute bottom-[16px] right-[16px] pt-[10px] pl-[10px]"
//                           onClick={async (): Promise<void> => {
//                             const contentLocal = await readClipboard();

//                             if (contentLocal) {
//                               handleChange(contentLocal);
//                             }
//                           }}
//                           aria-label="colar">
//                           <svg
//                             width="16"
//                             height="16"
//                             viewBox="0 0 16 16"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M5 0C4.25937 0 3.6125 0.403125 3.26875 1H1.5C0.671875 1 0 1.67188 0 2.5V12.5C0 13.3281 0.671875 14 1.5 14H6V5.5C6 4.11875 7.11875 3 8.5 3H10V2.5C10 1.67188 9.32812 1 8.5 1H6.73125C6.3875 0.403125 5.74063 0 5 0ZM8.5 4C7.67188 4 7 4.67188 7 5.5V14V14.5C7 15.3281 7.67188 16 8.5 16H14.5C15.3281 16 16 15.3281 16 14.5V7.62187C16 7.225 15.8406 6.84375 15.5594 6.5625L13.4375 4.44063C13.1562 4.15938 12.775 4 12.3781 4H10H8.5ZM5 1.25C5.19891 1.25 5.38968 1.32902 5.53033 1.46967C5.67098 1.61032 5.75 1.80109 5.75 2C5.75 2.19891 5.67098 2.38968 5.53033 2.53033C5.38968 2.67098 5.19891 2.75 5 2.75C4.80109 2.75 4.61032 2.67098 4.46967 2.53033C4.32902 2.38968 4.25 2.19891 4.25 2C4.25 1.80109 4.32902 1.61032 4.46967 1.46967C4.61032 1.32902 4.80109 1.25 5 1.25Z"
//                               fill="white"
//                             />
//                           </svg>
//                         </button>
//                       </div>
//                     </div>

//                     <div className="px-[11px] pt-[17px] w-full">
//                       {errorOnPastToClipboard ? (
//                         <div className="bg-[#FF5F5F] text-white font-semibold text-[16px] px-[20px] py-[12px] rounded-[3px] w-full">
//                           {errorOnPastToClipboard}
//                         </div>
//                       ) : undefined}
//                     </div>

//                     <div className="mt-[15px]" />

//                     <div className="flex justify-end items-center w-full px-[11px]">
//                       <button
//                         type="button"
//                         className="px-[22px] py-[16px] rounded-[3px] bg-[#212332] flex"
//                         onClick={(): void => {
//                           if (content) {
//                             handlePastToClipboard(content);
//                           }
//                         }}>
//                         <span>Tentar Novamente</span>

//                         <span className="ml-[16px]">
//                           <svg
//                             width="20"
//                             height="20"
//                             viewBox="0 0 20 20"
//                             fill="none"
//                             xmlns="http://www.w3.org/2000/svg">
//                             <path
//                               d="M1.40079 8.27707H1.03443C0.461182 8.27707 0 7.81589 0 7.24264V1.7257C0 1.30762 0.249987 0.92833 0.637897 0.768856C1.02581 0.609381 1.46975 0.695584 1.76715 0.992982L3.56015 2.78599C7.33581 -0.942259 13.4174 -0.929329 17.1715 2.82909C20.9428 6.60044 20.9428 12.7122 17.1715 16.4835C13.4001 20.2549 7.2884 20.2549 3.51705 16.4835C2.97829 15.9448 2.97829 15.0698 3.51705 14.531C4.05582 13.9923 4.93077 13.9923 5.46953 14.531C8.16335 17.2249 12.5295 17.2249 15.2233 14.531C17.9171 11.8372 17.9171 7.47108 15.2233 4.77726C12.5424 2.09637 8.21076 2.08344 5.51263 4.73416L7.28409 6.50993C7.58149 6.80732 7.66769 7.25126 7.50822 7.63918C7.34874 8.02709 6.96945 8.27707 6.55137 8.27707H1.40079Z"
//                               fill="#B592FF"
//                             />
//                           </svg>
//                         </span>
//                       </button>
//                     </div>

//                     <div className="mt-[16px]" />
//                   </div>
//                 ) : undefined}
//               </div>
//             </div>
//           </div>

//           <div className="mt-[72px]">
//             <Tasks />
//           </div>
//         </div>
//       </div>

//       <div className="h-[10rem]" />
//     </div>
