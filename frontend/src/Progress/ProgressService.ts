import Challenges from "../Challenges/Challenges";

export interface IProgress {
  challenges: Record<string, string>;
}

export class ProgressService {

  static LOCAL_STORAGE_KEY = "progress";

  public static createOrGet(): IProgress {
    return ProgressService.getProgress();
  }

  public static getFoundFlag(challengePath: string): string {
    return ProgressService.getProgress().challenges[challengePath];
  }

  public static updateProgress(challengeName: string, flag: string): IProgress {
    const progress = ProgressService.getProgress();
    progress.challenges[challengeName] = flag;

    ProgressService.setProgress(progress);

    return progress;

  }

  private static setProgress(progress: IProgress) {
    localStorage.setItem(ProgressService.LOCAL_STORAGE_KEY, JSON.stringify(progress));
  }

  private static getProgress(): IProgress {
    const p = localStorage.getItem(ProgressService.LOCAL_STORAGE_KEY);

    if (p) return JSON.parse(p) as IProgress;

    ProgressService.setProgress({ challenges: {} });

    return { challenges: {} } as IProgress;
  }

  public static clearProgress() {
    localStorage.clear();
  }

  public static done(): number {
    let count = 0;
    const progress = ProgressService.getProgress();
    Object.keys(progress.challenges).forEach(k => {
      const challenge = progress.challenges[k];
      if (challenge) count++;
    });

    return count;
  }

  public static donePercentage(): number {
    const done = ProgressService.done();
    const total = Challenges.length;

    return done * 100 / total;
  }
}