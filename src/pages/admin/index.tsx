import { useReactiveVar } from "@apollo/client";
import { Typography } from "@mui/material";
import { NextPage } from "next";
import { isLoggedInVar } from "../../client/cache";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import Link from "../../components/Shared/Link";
import { NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";

// TODO: Add remaining admin functionality and views - below is a WIP
const Admin: NextPage = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const t = useTranslate();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <>
      <LevelOneHeading style={{ fontSize: 18, marginBottom: 50 }}>
        {t("admin.labels.admin")}
      </LevelOneHeading>

      <Typography gutterBottom>{t("prompts.wip")}</Typography>

      <Typography>
        Posts can be managed{" "}
        <Link
          href={NavigationPaths.AdminPosts}
          style={{ fontWeight: "bold", color: "black" }}
        >
          here
        </Link>
        .
      </Typography>
    </>
  );
};

export default Admin;
