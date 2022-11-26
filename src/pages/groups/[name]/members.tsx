// TODO: Add remaining functionality - below is a WIP

import {
  Card,
  CardContent as MuiCardContent,
  styled,
  Typography,
} from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { breadcrumbsVar } from "../../../apollo/cache";
import { useGroupMembersQuery } from "../../../apollo/gen";
import JoinedMember from "../../../components/Groups/JoinedMember";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop, useTranslate } from "../../../hooks/common.hooks";
import { getGroupPath } from "../../../utils/group.utils";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 15,
  },
}));

const GroupMembers: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const { data, loading, error } = useGroupMembersQuery({
    variables: { name },
    skip: !name,
  });
  const group = data?.group;

  const { asPath } = useRouter();
  const isDesktop = useIsDesktop();
  const t = useTranslate();

  useEffect(() => {
    if (group) {
      breadcrumbsVar({
        path: asPath,
        breadcrumbs: [
          {
            label: truncate(name, {
              length: isDesktop
                ? TruncationSizes.Small
                : TruncationSizes.ExtraSmall,
            }),
            href: getGroupPath(name),
          },
          {
            label: t("groups.labels.groupMembers", {
              count: group.members.length || 0,
            }),
          },
        ],
      });
    }
  }, [group, t, isDesktop, asPath, name]);

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!group || !group.members.length) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        {group.members.map((member) => (
          <JoinedMember key={member.id} member={member} />
        ))}
      </CardContent>
    </Card>
  );
};

export default GroupMembers;
