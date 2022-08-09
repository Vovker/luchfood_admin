export type SelectOption = {
  id: number;
  name: string;
}

export type SelectOptions = {
  options: SelectOption[],
  name: string,
  initialValue?: number,
};
