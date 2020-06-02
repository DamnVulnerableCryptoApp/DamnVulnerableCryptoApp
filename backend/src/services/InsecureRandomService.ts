export class InsecureRandomService {
  public static FLAG = "83939130-daa9-4878-ab18-5d5edac5fead";

  public static generate5RandomValues(numberOfValues = 5): number[] {
    const numbers = [];
    for (let i = 0; i < 5; i++)
      numbers.push(Math.random());

    return numbers;
  }
}