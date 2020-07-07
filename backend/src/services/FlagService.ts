import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

export class FlagService {

  public static FLAG_FILE = path.join(__dirname, "../config/flags.json");
  private static flags: Record<string, string>;

  public static createOrLoadFlags() {
    const exists = FlagService.flagFileExists();
    if (!exists) FlagService.createFlags();
    FlagService.readFlags();
  }

  private static readFlags(): Record<string, string> {
    FlagService.flags = JSON.parse(fs.readFileSync(this.FLAG_FILE).toString());

    return FlagService.flags;
  }

  public static forceCreateFlags() {
    this.deleteFlagFile();
    this.createFlags();
  }

  public static deleteFlagFile() {
    if (FlagService.flagFileExists())
      fs.unlinkSync(this.FLAG_FILE);
  }

  public static getFlags(): Record<string, string> {
    if (!FlagService.flags) FlagService.createOrLoadFlags();

    return FlagService.flags;
  }

  private static listServices(): string[] {
    return fs.readdirSync(__dirname).map(f => path.basename(f).replace(".ts", ""));
  }

  private static generateFlag(): string {
    return uuidv4();
  }

  private static flagFileExists(): boolean {
    return fs.existsSync(FlagService.FLAG_FILE);
  }

  private static createFlags() {
    const flags: Record<string, string> = {};

    const serviceFiles = FlagService.listServices();
    serviceFiles.forEach(f => {
      f = path.basename(f).replace(".ts", "");
      if (f === "FlagService") return;

      flags[f] = this.generateFlag();
    });

    fs.writeFileSync(FlagService.FLAG_FILE, JSON.stringify(flags, null, '\t'));

  }
}