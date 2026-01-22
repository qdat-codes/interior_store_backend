declare module "validator" {
  export type IsEmailOptions = Record<string, unknown>;

  export interface Validator {
    isEmail(input: string, options?: IsEmailOptions): boolean;
  }

  const validator: Validator;
  export default validator;
}

