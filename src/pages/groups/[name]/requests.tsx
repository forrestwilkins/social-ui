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
import { breadcrumbsVar } from "../../../client/cache";
import MemberRequest from "../../../components/Groups/MemberRequest";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop, useTranslate } from "../../../hooks/common.hooks";
import { useGroupQuery } from "../../../hooks/group.hooks";
import {
  MemberRequest as MemberRequestType,
  useMemberRequestsQuery,
} from "../../../types/generated.types";
import { getGroupPath } from "../../../utils/group.utils";

const CardContent = styled(MuiCardContent)(() => ({
  "&:last-child": {
    paddingBottom: 15,
  },
}));

// TODO: Add remaining functionality - below is a WIP
const MemberRequests: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const [group, _, groupError] = useGroupQuery(name);

  const { data, loading, error } = useMemberRequestsQuery({
    variables: { groupId: group!.id },
    skip: !group,
  });

  const isDesktop = useIsDesktop();
  const t = useTranslate();

  useEffect(() => {
    if (group) {
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
  }, [group, t, isDesktop, data?.memberRequests]);

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
          <MemberRequest
            key={memberRequest.id}
            memberRequest={memberRequest as MemberRequestType}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default MemberRequests;
