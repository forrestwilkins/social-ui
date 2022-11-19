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
import RequestToJoin from "../../../components/Groups/RequestToJoin";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop, useTranslate } from "../../../hooks/common.hooks";
import { useGroupQuery, useMemberRequestsQuery } from "../../../apollo/gen";
import { getGroupPath } from "../../../utils/group.utils";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 15,
  },
}));

const MemberRequests: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");

  const { data: groupData, error: groupError } = useGroupQuery({
    variables: { name },
    skip: !name,
  });

  const { data, loading, error } = useMemberRequestsQuery({
    variables: { groupId: groupData?.group.id as number },
    skip: !groupData?.group,
  });

  const isDesktop = useIsDesktop();
  const t = useTranslate();

  useEffect(() => {
    if (groupData?.group) {
      const { group } = groupData;
      breadcrumbsVar([
        {
          label: truncate(group.name, {
            length: isDesktop
              ? TruncationSizes.Small
              : TruncationSizes.ExtraSmall,
          }),
          href: getGroupPath(group.name),
        },
        {
          label: t("groups.labels.memberRequests", {
            count: data?.memberRequests.length || 0,
          }),
        },
      ]);
    }

    return () => {
      breadcrumbsVar([]);
    };
  }, [groupData, t, isDesktop, data?.memberRequests]);

  if (error || groupError) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data || !data.memberRequests.length) {
    return null;
  }

  return (
    <Card>
      <CardContent>
        {data.memberRequests.map((memberRequest) => (
          <RequestToJoin key={memberRequest.id} memberRequest={memberRequest} />
        ))}
      </CardContent>
    </Card>
  );
};

export default MemberRequests;
