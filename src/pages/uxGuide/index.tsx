/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
import type { Dispatch, ReactElement, ReactNode, SetStateAction } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutScreen, useHandleKeyboard } from 'ogregorio-component-library-studies';
import SofaImage from './sofa.png';
import Cursor from './cursor.gif';
import ErrorImage from './error.gif';
import LoadingImage from './loading.gif';
import HoverImage from './hover.gif';
import InvalidImage from './invalid.gif';

import Background1 from '../bg1.webp';

interface IMockDataIsSelectedType {
  text: string;
  content: ReactNode;
  selected: boolean;
  extraClass?: string;
  animationButtonStyles?: string;
}

const mockDataCursor: IMockDataIsSelectedType[] = [
  {
    text: 'cursor-default',
    extraClass: 'cursor-default',
    content: <div />,
    selected: true,
  },

  {
    text: 'cursor-pointer',
    extraClass: 'cursor-pointer',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-wait',
    extraClass: 'cursor-wait',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-text',
    extraClass: 'cursor-text',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-move',
    extraClass: 'cursor-move',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-help',
    extraClass: 'cursor-help',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-not-allowed',
    extraClass: 'cursor-not-allowed',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-none',
    extraClass: 'cursor-none',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-context-menu',
    extraClass: 'cursor-context-menu',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-progress',
    extraClass: 'cursor-progress',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-cell',
    extraClass: 'cursor-cell',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-crosshair',
    extraClass: 'cursor-crosshair',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-vertical-text',
    extraClass: 'cursor-vertical-text',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-alias',
    extraClass: 'cursor-alias',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-copy',
    extraClass: 'cursor-copy',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-grab',
    extraClass: 'cursor-grab',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-grabbing',
    extraClass: 'cursor-grabbing',
    content: <div />,
    selected: true,
  },

  {
    text: 'cursor-all-scroll',
    extraClass: 'cursor-all-scroll',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-col-resize',
    extraClass: 'cursor-col-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-row-resize',
    extraClass: 'cursor-row-resize',
    content: <div />,
    selected: true,
  },

  {
    text: 'cursor-n-resize',
    extraClass: 'cursor-n-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-e-resize',
    extraClass: 'cursor-e-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-s-resize',
    extraClass: 'cursor-s-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-nw-resize',
    extraClass: 'cursor-nw-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-w-resize',
    extraClass: 'cursor-w-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-ne-resize',
    extraClass: 'cursor-ne-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-se-resize',
    extraClass: 'cursor-se-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-sw-resize',
    extraClass: 'cursor-sw-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-ew-resize',
    extraClass: 'cursor-ew-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-ns-resize',
    extraClass: 'cursor-ns-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-nesw-resize',
    extraClass: 'cursor-nesw-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-nwse-resize',
    extraClass: 'cursor-nwse-resize',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-none',
    extraClass: 'cursor-none',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-zoom-in',
    extraClass: 'cursor-zoom-in',
    content: <div />,
    selected: true,
  },
  {
    text: 'cursor-zoom-out',
    extraClass: 'cursor-zoom-out',
    content: <div />,
    selected: true,
  },
];

const mockDataIsSelected: IMockDataIsSelectedType[] = [
  {
    text: 'Sim',
    content: <div className="text-white text-md py-2">Você pode me selecionar</div>,
    selected: true,
  },
  {
    text: 'Não',
    content: <div className="text-white text-md py-2 select-none">Você não pode me selecionar!</div>,
    selected: true,
  },
];

const mockDataOnFocus: IMockDataIsSelectedType[] = [
  {
    text: 'Outline',
    content: (
      <div className="text-white text-md py-2">
        <input
          type="text"
          name=""
          id=""
          className="border-2 border-gray-500 w-full bg-transparent focus:outline-teal-500"
        />
      </div>
    ),
    selected: true,
  },
  {
    text: 'Sem Outline',
    content: (
      <div className="text-white text-md py-2">
        <input
          type="text"
          name=""
          id=""
          className="border-2 border-gray-500 w-full bg-transparent focus:outline-none"
        />
      </div>
    ),
    selected: true,
  },
  {
    text: 'Outro',
    content: (
      <div className="text-white text-md py-2 select-none">
        <input type="text" name="" id="" className="border-2 border-gray-500 w-full bg-transparent " />
      </div>
    ),
    selected: true,
  },
];

const mockDataIsHover: IMockDataIsSelectedType[] = [
  {
    text: 'Scale +',
    animationButtonStyles: 'transition-all duration-150 hover:scale-105',
    content: <div />,
    selected: true,
  },
  {
    text: 'Scale -',
    animationButtonStyles: 'transition-all duration-150 hover:scale-95',
    content: <div />,
    selected: true,
  },

  {
    text: 'Colors',
    animationButtonStyles: 'transition-all duration-150 hover:bg-teal-500',
    content: <div />,
    selected: true,
  },

  {
    text: 'Outro',
    content: <div />,
    selected: true,
  },
];

const mockDataOnDisabled: IMockDataIsSelectedType[] = [
  {
    text: 'Sim',
    content: <div />,
    selected: true,
  },
  {
    text: 'Não',
    content: <div />,
    selected: true,
  },
  {
    text: 'Não Precisa',
    content: <div />,
    selected: true,
  },
];

const mockDataOnError: IMockDataIsSelectedType[] = [
  {
    text: 'Sim',
    content: <div />,
    selected: true,
  },
  {
    text: 'Não',
    content: <div />,
    selected: true,
  },
  {
    text: 'Não Precisa',
    content: <div />,
    selected: true,
  },
];

const mockDataIsResizable: IMockDataIsSelectedType[] = [
  {
    text: 'resize-none',
    content: (
      <div>
        <textarea className="resize-none rounded-md bg-transparent border-2 border-gray-500 w-full mt-2" />
      </div>
    ),
    selected: true,
  },

  {
    text: 'resize',
    content: (
      <div>
        <textarea className="resize rounded-md bg-transparent border-2 border-gray-500 w-full mt-2" />
      </div>
    ),
    selected: true,
  },
  {
    text: 'resize-y',
    content: (
      <div>
        <textarea className="resize-y rounded-md bg-transparent border-2 border-gray-500 w-full mt-2" />
      </div>
    ),
    selected: true,
  },
  {
    text: 'resize-x',
    content: (
      <div>
        <textarea className="resize-x rounded-md bg-transparent border-2 border-gray-500 w-full mt-2" />
      </div>
    ),
    selected: true,
  },
];

const mockTipsDesign: IMockDataIsSelectedType[] = [
  {
    text: 'Ter um tamanho fixo',
    content: (
      <div className="w-full flex items-center justify-center">
        <div className="animate-animateWidthResize border-2 border-slate-500 flex items-center justify-center min-h-[25rem]">
          <div className="max-w-[9rem] w-full mx-[2rem] bg-teal-500 min-h-[5rem] flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.75 1.875C13.75 0.835937 12.9141 0 11.875 0C10.8359 0 10 0.835937 10 1.875V5C7.24219 5 5 7.24219 5 10H1.875C0.835937 10 0 10.8359 0 11.875C0 12.9141 0.835937 13.75 1.875 13.75H5V18.125H1.875C0.835937 18.125 0 18.9609 0 20C0 21.0391 0.835937 21.875 1.875 21.875H5V26.25H1.875C0.835937 26.25 0 27.0859 0 28.125C0 29.1641 0.835937 30 1.875 30H5C5 32.7578 7.24219 35 10 35V38.125C10 39.1641 10.8359 40 11.875 40C12.9141 40 13.75 39.1641 13.75 38.125V35H18.125V38.125C18.125 39.1641 18.9609 40 20 40C21.0391 40 21.875 39.1641 21.875 38.125V35H26.25V38.125C26.25 39.1641 27.0859 40 28.125 40C29.1641 40 30 39.1641 30 38.125V35C32.7578 35 35 32.7578 35 30H38.125C39.1641 30 40 29.1641 40 28.125C40 27.0859 39.1641 26.25 38.125 26.25H35V21.875H38.125C39.1641 21.875 40 21.0391 40 20C40 18.9609 39.1641 18.125 38.125 18.125H35V13.75H38.125C39.1641 13.75 40 12.9141 40 11.875C40 10.8359 39.1641 10 38.125 10H35C35 7.24219 32.7578 5 30 5V1.875C30 0.835937 29.1641 0 28.125 0C27.0859 0 26.25 0.835937 26.25 1.875V5H21.875V1.875C21.875 0.835937 21.0391 0 20 0C18.9609 0 18.125 0.835937 18.125 1.875V5H13.75V1.875ZM12.5 10H27.5C28.8828 10 30 11.1172 30 12.5V27.5C30 28.8828 28.8828 30 27.5 30H12.5C11.1172 30 10 28.8828 10 27.5V12.5C10 11.1172 11.1172 10 12.5 10ZM27.5 12.5H12.5V27.5H27.5V12.5Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    ),
    selected: true,
  },
  {
    text: 'Esticar até o infinito',
    content: (
      <div className="w-full flex items-center justify-center">
        <div className="animate-animateWidthResize border-2 border-slate-500 flex items-center justify-center min-h-[25rem]">
          <div className="min-w-[2rem] w-full mx-[2rem] bg-teal-500 min-h-[5rem] flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.75 1.875C13.75 0.835937 12.9141 0 11.875 0C10.8359 0 10 0.835937 10 1.875V5C7.24219 5 5 7.24219 5 10H1.875C0.835937 10 0 10.8359 0 11.875C0 12.9141 0.835937 13.75 1.875 13.75H5V18.125H1.875C0.835937 18.125 0 18.9609 0 20C0 21.0391 0.835937 21.875 1.875 21.875H5V26.25H1.875C0.835937 26.25 0 27.0859 0 28.125C0 29.1641 0.835937 30 1.875 30H5C5 32.7578 7.24219 35 10 35V38.125C10 39.1641 10.8359 40 11.875 40C12.9141 40 13.75 39.1641 13.75 38.125V35H18.125V38.125C18.125 39.1641 18.9609 40 20 40C21.0391 40 21.875 39.1641 21.875 38.125V35H26.25V38.125C26.25 39.1641 27.0859 40 28.125 40C29.1641 40 30 39.1641 30 38.125V35C32.7578 35 35 32.7578 35 30H38.125C39.1641 30 40 29.1641 40 28.125C40 27.0859 39.1641 26.25 38.125 26.25H35V21.875H38.125C39.1641 21.875 40 21.0391 40 20C40 18.9609 39.1641 18.125 38.125 18.125H35V13.75H38.125C39.1641 13.75 40 12.9141 40 11.875C40 10.8359 39.1641 10 38.125 10H35C35 7.24219 32.7578 5 30 5V1.875C30 0.835937 29.1641 0 28.125 0C27.0859 0 26.25 0.835937 26.25 1.875V5H21.875V1.875C21.875 0.835937 21.0391 0 20 0C18.9609 0 18.125 0.835937 18.125 1.875V5H13.75V1.875ZM12.5 10H27.5C28.8828 10 30 11.1172 30 12.5V27.5C30 28.8828 28.8828 30 27.5 30H12.5C11.1172 30 10 28.8828 10 27.5V12.5C10 11.1172 11.1172 10 12.5 10ZM27.5 12.5H12.5V27.5H27.5V12.5Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    ),
    selected: true,
  },
  {
    text: 'Esticar, mas ter um tamanho máximo',
    content: (
      <div className="w-full flex items-center justify-center">
        <div className="animate-animateWidthResize border-2 border-slate-500 flex items-center justify-center min-h-[25rem]">
          <div className="min-w-[2rem] max-w-[12rem] w-full mx-[2rem] bg-teal-500 min-h-[5rem] flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13.75 1.875C13.75 0.835937 12.9141 0 11.875 0C10.8359 0 10 0.835937 10 1.875V5C7.24219 5 5 7.24219 5 10H1.875C0.835937 10 0 10.8359 0 11.875C0 12.9141 0.835937 13.75 1.875 13.75H5V18.125H1.875C0.835937 18.125 0 18.9609 0 20C0 21.0391 0.835937 21.875 1.875 21.875H5V26.25H1.875C0.835937 26.25 0 27.0859 0 28.125C0 29.1641 0.835937 30 1.875 30H5C5 32.7578 7.24219 35 10 35V38.125C10 39.1641 10.8359 40 11.875 40C12.9141 40 13.75 39.1641 13.75 38.125V35H18.125V38.125C18.125 39.1641 18.9609 40 20 40C21.0391 40 21.875 39.1641 21.875 38.125V35H26.25V38.125C26.25 39.1641 27.0859 40 28.125 40C29.1641 40 30 39.1641 30 38.125V35C32.7578 35 35 32.7578 35 30H38.125C39.1641 30 40 29.1641 40 28.125C40 27.0859 39.1641 26.25 38.125 26.25H35V21.875H38.125C39.1641 21.875 40 21.0391 40 20C40 18.9609 39.1641 18.125 38.125 18.125H35V13.75H38.125C39.1641 13.75 40 12.9141 40 11.875C40 10.8359 39.1641 10 38.125 10H35C35 7.24219 32.7578 5 30 5V1.875C30 0.835937 29.1641 0 28.125 0C27.0859 0 26.25 0.835937 26.25 1.875V5H21.875V1.875C21.875 0.835937 21.0391 0 20 0C18.9609 0 18.125 0.835937 18.125 1.875V5H13.75V1.875ZM12.5 10H27.5C28.8828 10 30 11.1172 30 12.5V27.5C30 28.8828 28.8828 30 27.5 30H12.5C11.1172 30 10 28.8828 10 27.5V12.5C10 11.1172 11.1172 10 12.5 10ZM27.5 12.5H12.5V27.5H27.5V12.5Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </div>
    ),
    selected: true,
  },
];

const mockTipsImage: IMockDataIsSelectedType[] = [
  {
    text: 'Expandir até o infinito',
    content: (
      <div className="w-full flex items-center justify-center">
        <div className="animate-animateWidthResize border-2 border-slate-500 flex items-center justify-center min-h-[25rem]">
          <img src={SofaImage} height={200} width={200} className="w-full" alt="" aria-hidden />
        </div>
      </div>
    ),
    selected: true,
  },
  {
    text: 'Largura e altura máximos',
    content: (
      <div className="w-full flex items-center justify-center">
        <div className="animate-animateWidthResize border-2 border-slate-500 flex items-center justify-center min-h-[25rem]">
          <img src={SofaImage} height={200} width={200} className="" alt="" aria-hidden />
        </div>
      </div>
    ),
    selected: true,
  },
  {
    text: 'Altura máxima e cover',
    content: (
      <div className="w-full flex items-center justify-center">
        <div className="animate-animateWidthResize border-2 border-slate-500 flex items-center justify-center min-h-[25rem]">
          <img src={SofaImage} height={200} width={200} className="w-full object-cover h-[5rem]" alt="" aria-hidden />
        </div>
      </div>
    ),
    selected: true,
  },
  {
    text: 'Altura máxima sem cover',
    content: (
      <div className="w-full flex items-center justify-center">
        <div className="animate-animateWidthResize border-2 border-slate-500 flex items-center justify-center min-h-[25rem]">
          <img src={SofaImage} height={200} width={200} className="w-full object-center h-[5rem]" alt="" aria-hidden />
        </div>
      </div>
    ),
    selected: true,
  },
];

const mockImageIsDraggable: IMockDataIsSelectedType[] = [
  {
    text: 'Sim',
    content: (
      <div>
        <div className="text-white pt-2">Tente arrastar a imagem</div>
        <img
          className="text-white text-md py-2 object-cover"
          src={SofaImage}
          width={720}
          height={960}
          draggable
          alt=""
        />
      </div>
    ),
    selected: true,
  },
  {
    text: 'Não',
    content: (
      <div>
        <div className="text-white pt-2">Tente arrastar a imagem</div>
        <img
          className="text-white text-md py-2 object-cover"
          src={SofaImage}
          width={720}
          height={960}
          draggable={false}
          alt=""
        />
      </div>
    ),
    selected: true,
  },
];

const ItemTaskOneOK = ({
  dataCursor,
  handleUpdate,
}: {
  dataCursor: IMockDataIsSelectedType[];
  handleUpdate: (textButton: string) => void;
}): ReactElement => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {dataCursor.map((item: IMockDataIsSelectedType) => {
        return (
          <div key={item.text}>
            <div
              className={`${
                item.animationButtonStyles
                  ? item.animationButtonStyles
                  : 'duration-700 md:hover:scale-105 hover:duration-150 transition-all'
              } flex  ${item.selected ? 'bg-[#3d4046]' : 'bg-[#2d3036]'}`}>
              <button
                type="button"
                onClick={(): void => handleUpdate(item.text)}
                className={`border-l-4  pl-4 pr-7 py-2 flex-1 text-left text-lg capitalize select-none ${
                  item.selected ? ' border-l-gray-500 text-gray-500' : 'border-l-teal-500 text-white'
                }

            ${item.extraClass || ''}
            `}>
                {item.text}
              </button>
            </div>
            {item.content}
          </div>
        );
      })}
    </div>
  );
};

const handleUpdateStatus = (
  textButton: string,
  data: IMockDataIsSelectedType[],
  setData: Dispatch<SetStateAction<IMockDataIsSelectedType[]>>,
): void => {
  const dataIsSelectedToUpdate: IMockDataIsSelectedType[] = data.map((item: IMockDataIsSelectedType) => {
    if (item.text === textButton) {
      return {
        ...item,
        selected: false,
      };
    }

    return {
      ...item,
      selected: true,
    };
  });

  setData(dataIsSelectedToUpdate);
};

const colors = ['hover:text-[#FFB84C]', 'hover:text-[#F266AB]', 'hover:text-[#A459D1]', 'hover:text-[#2CD3E1]'];

export const UxGuidePage = (): ReactElement => {
  const [dataIsSelected, setDataIsSelected] = useState<IMockDataIsSelectedType[]>(mockDataIsSelected);
  const [dataCursor, setDataCursor] = useState<IMockDataIsSelectedType[]>(mockDataCursor);
  const [ImageIsDraggable, setImageIsDraggable] = useState<IMockDataIsSelectedType[]>(mockImageIsDraggable);
  const [dataIsHover, setDataIsHover] = useState<IMockDataIsSelectedType[]>(mockDataIsHover);
  const [dataOnfocus, setDataOnfocus] = useState<IMockDataIsSelectedType[]>(mockDataOnFocus);
  const [dataOnDisabled, setDataOnDisabled] = useState<IMockDataIsSelectedType[]>(mockDataOnDisabled);
  const [dataOnError, setDataOnError] = useState<IMockDataIsSelectedType[]>(mockDataOnError);
  const [dataOnEmpty, setDataOnEmpty] = useState<IMockDataIsSelectedType[]>(mockDataOnError);
  const [dataOnImgAlternative, setDataOnImgAlternative] = useState<IMockDataIsSelectedType[]>(mockDataOnError);
  const [dataOnInvalid, setDataOnInvalid] = useState<IMockDataIsSelectedType[]>(mockDataOnError);
  const [dataOnLoading, setDataOnLoading] = useState<IMockDataIsSelectedType[]>(mockDataOnError);
  const [dataResizable, setDataResizable] = useState<IMockDataIsSelectedType[]>(mockDataIsResizable);
  const [dataTipDesing, setDataTipDesing] = useState<IMockDataIsSelectedType[]>(mockTipsDesign);
  const [dataTipImage, setDataTipImage] = useState<IMockDataIsSelectedType[]>(mockTipsImage);

  const navigate = useNavigate();

  useHandleKeyboard((key) => {
    if (key === 'Escape') {
      navigate('/');
    }
  });

  return (
    <LayoutScreen screenTitle="HELP UX" onReturn={() => navigate('/')} bg={Background1}>
      <div className="flex gap-6 h-full animate-fadeIn  max-h-full overflow-y-hidden px-[2rem] w-full">
        <div className="flex-1 overflow-y-scroll scrollbar">
          <div className="mt-[70px] ml-[62px] flex flex-col items-center">
            <div className="">
              <h1 className="font-bold text-3xl cursor-pointer select-none h-[50px]">
                {'Utilitário para desenvolver componentes'.split(' ').map((word, index) => {
                  return (
                    <span
                      className={`${colors[index]} text-white/70 transition-all duration-[2s] hover:duration-150 hover:text-5xl `}
                      key={word}>
                      {word}
                      {` `}
                    </span>
                  );
                })}
              </h1>
            </div>

            <div className="h-[40px]" />

            <div className="max-w-[50rem] w-full px-3">
              <div>
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">
                    Componente é selecionável?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataIsSelected}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataIsSelected, setDataIsSelected)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase flex">
                    <img src={Cursor} width={25} height={25} alt="cursores" aria-hidden className="mr-2" />
                    Qual será o cursor?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataCursor}
                  handleUpdate={(textButton: string): void => handleUpdateStatus(textButton, dataCursor, setDataCursor)}
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">É arrastável?</h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={ImageIsDraggable}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, ImageIsDraggable, setImageIsDraggable)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase flex items-center">
                    <img src={HoverImage} width={90} height={90} alt="efeito de hover" aria-hidden className="mr-2" />
                    Ao passar o mouse no desktop (hover)?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataIsHover}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataIsHover, setDataIsHover)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">Ao Focar o input</h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataOnfocus}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataOnfocus, setDataOnfocus)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">
                    🚫 Já fez quando estiver desabilitado?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataOnDisabled}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataOnDisabled, setDataOnDisabled)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase flex items-center">
                    <img
                      src={LoadingImage}
                      width={90}
                      height={90}
                      alt="efeito de loading"
                      aria-hidden
                      className="mr-2"
                    />
                    Já fez quando tiver com loading, isso é, aguardando resposta?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataOnLoading}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataOnLoading, setDataOnLoading)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase flex items-center">
                    <img
                      src={InvalidImage}
                      width={90}
                      height={90}
                      alt="efeito de invalido"
                      aria-hidden
                      className="mr-2"
                    />
                    Já fez quando tiver valores inválidos?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataOnInvalid}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataOnInvalid, setDataOnInvalid)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase flex items-center">
                    <img src={ErrorImage} width={90} height={90} alt="efeito de erro" aria-hidden className="mr-2" /> Já
                    fez quando tiver erro ao obter informações?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataOnError}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataOnError, setDataOnError)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">
                    ⛔ Já fez quando a resposta do servidor for vazia?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataOnEmpty}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataOnEmpty, setDataOnEmpty)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">
                    ♿ Se for imagem, foi pensado o texto alternativo?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataOnImgAlternative}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataOnImgAlternative, setDataOnImgAlternative)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">
                    Pode ser redimensionado?
                  </h3>
                </div>

                <ItemTaskOneOK
                  dataCursor={dataResizable}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataResizable, setDataResizable)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">
                    Qual deve ser o comportamento do componente?
                  </h3>
                </div>
                <ItemTaskOneOK
                  dataCursor={dataTipDesing}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataTipDesing, setDataTipDesing)
                  }
                />
              </div>

              <div className="mt-16">
                <div>
                  <h3 className="text-gray-200 text-xl border-b-2 border-teal-500 mb-2 uppercase">
                    Qual deve ser o comportamento se for imagem?
                  </h3>
                </div>
                <ItemTaskOneOK
                  dataCursor={dataTipImage}
                  handleUpdate={(textButton: string): void =>
                    handleUpdateStatus(textButton, dataTipImage, setDataTipImage)
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutScreen>
  );
};
