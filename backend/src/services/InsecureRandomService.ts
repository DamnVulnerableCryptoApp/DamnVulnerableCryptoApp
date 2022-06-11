import { ChallengeService } from './ChallengeService'

export class InsecureRandomService extends ChallengeService {

  public static generate5RandomValues(numberOfValues = 5): number[] {
    const numbers = []
    for (let i = 0; i < 5; i++)
      numbers.push(Math.random())

    return numbers
  }
}