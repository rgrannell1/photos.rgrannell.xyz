
export type ValidationError = {
  message: string;
}

export type Validator = (object: unknown) => ValidationError[];

export type Expectations = {
  [key: string]: (value: unknown) => ValidationError[]
}
