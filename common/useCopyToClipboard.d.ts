interface IResponseType {
    copy: (text: string) => void;
    isCopied: boolean;
}
export declare const useCopyToClipboard: () => IResponseType;
export {};
