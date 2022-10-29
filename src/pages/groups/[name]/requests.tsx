import { Typography } from "@mui/material";
import { truncate } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { breadcrumbsVar } from "../../../client/cache";
import ProgressBar from "../../../components/Shared/ProgressBar";
import { TruncationSizes } from "../../../constants/common.constants";
import { useIsDesktop, useTranslate } from "../../../hooks/common.hooks";
import { useGroupQuery } from "../../../hooks/group.hooks";
import { getGroupPath } from "../../../utils/group.utils";

// TODO: Add remaining functionality - below is a WIP
const MemberRequests: NextPage = () => {
  const { query } = useRouter();
  const name = String(query?.name || "");
  const [group, loading, error] = useGroupQuery(name);

  const t = useTranslate();
  const isDesktop = useIsDesktop();

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
          label: t("groups.labels.memberRequests"),
        },
      ]);
    } else {
      breadcrumbsVar([]);
    }

    return () => {
      breadcrumbsVar([]);
    };
  }, [group, t, isDesktop]);

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!group) {
    return null;
  }

  return <></>;
};

export default MemberRequests;
