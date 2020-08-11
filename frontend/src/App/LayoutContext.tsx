import { createContext } from "react";
import { IProgress } from "../Progress/ProgressService";

export interface ILayoutContextProps {
  setProgress: React.Dispatch<React.SetStateAction<IProgress>>;
  setProgressPercentage: React.Dispatch<React.SetStateAction<number>>;
  setChallengesDone: React.Dispatch<React.SetStateAction<number>>;
  progress: IProgress;
  progressPercentage: number;
  challengesDone: number;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackErrorMessage: (str: string) => void;
}


export const LayoutContext = createContext({} as ILayoutContextProps);


