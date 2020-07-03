import { FlagService } from './FlagService';

export class ChallengeService {
  public static getFlag(): string {
    return FlagService.getFlags()[this.name];
  }
}