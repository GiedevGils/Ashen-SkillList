export enum CategoryType {
  Profession = 1,
  Weapon = 2,
  Basic = 3,
  Miscellaneous = 4,
}

export class CategoryTypeHelper {
  public static getArrayOfTypes(): { typeId: number; text: string }[] {
    return Object.keys(CategoryType)
      .filter((key) => typeof CategoryType[key] === 'number')
      .map((key) => ({
        typeId: CategoryType[key],
        text: key,
      }));
  }
}
