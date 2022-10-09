export interface Group {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  __typename: string;
}

export type GroupFormValues = Pick<Group, "name" | "description">;
