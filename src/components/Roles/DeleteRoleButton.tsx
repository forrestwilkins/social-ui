import { toastVar } from "../../apollo/cache";
import { useDeleteRoleMutation } from "../../apollo/gen";
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
    await redirectTo(NavigationPaths.Home);

    await deleteRole({
      variables: { id: roleId },
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
