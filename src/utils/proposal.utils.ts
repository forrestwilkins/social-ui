import { Namespace, TFunction } from "react-i18next";
import { ProposalActionTypes } from "../constants/proposal.constants";

export const getProposalActionTypeOptions = (
  t: TFunction<Namespace<"ns1">, undefined>
) => [
  {
    message: t("proposals.actionTypes.assignRole"),
    value: ProposalActionTypes.AssignRole,
  },
  {
    message: t("proposals.actionTypes.changeCoverPhoto"),
    value: ProposalActionTypes.ChangeCoverPhoto,
  },
  {
    message: t("proposals.actionTypes.changeDescription"),
    value: ProposalActionTypes.ChangeDescription,
  },
  {
    message: t("proposals.actionTypes.changeName"),
    value: ProposalActionTypes.ChangeName,
  },
  {
    message: t("proposals.actionTypes.changeRole"),
    value: ProposalActionTypes.ChangeRole,
  },
  {
    message: t("proposals.actionTypes.changeSettings"),
    value: ProposalActionTypes.ChangeSettings,
  },
  {
    message: t("proposals.actionTypes.createRole"),
    value: ProposalActionTypes.CreateRole,
  },
  {
    message: t("proposals.actionTypes.planEvent"),
    value: ProposalActionTypes.PlanEvent,
  },
  {
    message: t("proposals.actionTypes.test"),
    value: ProposalActionTypes.Test,
  },
];
