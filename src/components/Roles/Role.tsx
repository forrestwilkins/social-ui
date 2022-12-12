// TODO: Add remaining layout and functionality - below is a WIP

import { RoleFragment } from "../../apollo/gen";

interface Props {
  role: RoleFragment;
}

const Role = ({ role: { name } }: Props) => <>{name}</>;

export default Role;
