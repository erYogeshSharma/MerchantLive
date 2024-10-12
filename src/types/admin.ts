import { IBusinessCard } from "./business";

export type User = {
  _id: string;
  name: string;
  email: string;
  business: Partial<IBusinessCard>;
  status: string;
  plan: string;
  createdAt: string;
  updatedAt: string;
  profilePicUrl: string;
  expiresAt: string;

  plan_start_date: string;
  plan_end_date: string;
  is_paid_plan: "ACTIVE" | "INACTIVE";
};
