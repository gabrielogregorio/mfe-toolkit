export declare const useTimer: (goal: number) => {
    time: string;
    pause: () => void;
    resume: () => void;
    percentage: number;
};
