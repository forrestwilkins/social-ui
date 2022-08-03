import { useQuery } from "@apollo/client";
import { Person as UserIcon } from "@mui/icons-material";
import { Card, CardContent, Typography } from "@mui/material";
import { NextPage } from "next";
import { USERS_QUERY } from "../../client/users/queries";
import Flex from "../../components/Shared/Flex";
import LevelOneHeading from "../../components/Shared/LevelOneHeading";
import ProgressBar from "../../components/Shared/ProgressBar";
import { useTranslate } from "../../hooks/common";
import { UsersQuery } from "../../types/user";

const UsersIndex: NextPage = () => {
  const { data, error, loading } = useQuery<UsersQuery>(USERS_QUERY);
  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  return (
    <Card elevation={0}>
      <CardContent sx={{ paddingTop: 0 }}>
        <LevelOneHeading style={{ fontSize: 20, marginBottom: 18 }}>
          {t("navigation.users")}
        </LevelOneHeading>

        {data?.users.map((user) => (
          <Flex key={user.id} sx={{ marginBottom: 1 }}>
            <UserIcon
              fontSize="small"
              sx={{ marginTop: 0.25, marginRight: 0.5 }}
            />
            <Typography>{user.name}</Typography>
          </Flex>
        ))}
      </CardContent>
    </Card>
  );
};

export default UsersIndex;
