import { ChallengeService } from './ChallengeService';

export class TimingAttackService extends ChallengeService {

  // https://github.com/danielmiessler/SecLists/blob/master/Usernames/cirt-default-usernames.txt
  // password -> aslidhaiusdas7da8shdiukjas123
  public static USER = { username: "abel", password: "___" };

  public static async checkLogin(username: string, password: string): Promise<boolean> {

    // simulate going to the database
    // the ideia is that the app goes to the db searching for the current user
    // we added a long time to be more reliable, with less FP's
    await this.sleep(100);
    if (username.toLowerCase() === TimingAttackService.USER.username) {

      // simulate other actions like checking if the user isn't locked, doesn't need to change pass
      // update login attempts, and hash the password
      // we did a sleep to simulate the time those actions would take, and increased it a bit, so it is easier to spot the difference
      // a real timming attack may have really low time differences, so we just exagerated it to make it easier of noticing
      // since we already 'simulated' hashing the password anc compared it we don't actually need to change to an actual password
      // as we don't want to have any valid login, just the possibility of finding an available user
      await this.sleep(500);

      return false;
    }

    return false;
  }

  public static async checkUsername(username: string) {
    await this.sleep(5000); // just to make sure this method is not bruteforced

    return username === TimingAttackService.USER.username;
  }

  public static async sleep(miliseconds: number): Promise<any> {
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(), miliseconds);
    });
  }



}