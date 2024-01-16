import { TLabels } from "./schemas/taskform.schema.type";

// client side types
export type TOptionItem = {
  value: TLabels;
  label: string;
};

// server side types
export type TPostUpdateReturn = {
  status: boolean;
  message: string;
};
