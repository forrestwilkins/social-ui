import produce from "immer";
import { toastVar } from "../../apollo/cache";
import {
  ServerRolesDocument,
  ServerRolesQuery,
  useDeleteRoleMutation,
} from "../../apollo/gen";
import { NavigationPaths } from "../../constants/common.constants";
import { useTranslate } from "../../hooks/common.hooks";
import { redirectTo } from "../../utils/common.utils";
import DeleteButton from "../Shared/DeleteButton";

interface Props {
  roleId: number;
}

const DeleteRoleButton = ({ roleId }: Props) => {
  const [deleteRole] = useDeleteRoleMutation();
  const t = useTranslate();

  const handleClick = async () => {
    await redirectTo(NavigationPaths.Roles);

    await deleteRole({
      variables: { id: roleId },
      update(cache) {
        cache.updateQuery<ServerRolesQuery>(
          { query: ServerRolesDocument },
          (rolesData) =>
            produce(rolesData, (draft) => {
              if (!draft) {
                return;
              }
              const index = draft.serverRoles.findIndex(
                (role) => role.id === roleId
              );
              draft.serverRoles.splice(index, 1);
            })
        );
      },
      onError() {
        toastVar({
          status: "error",
          title: t("errors.somethingWentWrong"),
        });
      },
    });
  };

  const handleClickWithConfirm = () =>
    window.confirm(t("prompts.deleteItem", { itemType: "role" })) &&
    handleClick();

  return (
    <DeleteButton onClick={handleClickWithConfirm}>
      {t("roles.actions.delete")}
    </DeleteButton>
  );
};

export default DeleteRoleButton;