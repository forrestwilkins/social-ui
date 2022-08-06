import { useQuery, useReactiveVar } from "@apollo/client";
import { AccountCircle as ProfileIcon } from "@mui/icons-material";
import { Button } from "@mui/material";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../../client/cache";
import { ME_QUERY } from "../../client/users/queries";
import { NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { MeQuery } from "../../types/user";
import { redirectTo } from "../../utils/common";
import Flex from "../Shared/Flex";
import TopNavDropdown from "./TopNavDropdown";

const DesktopNav = () => {
  const { data, loading } = useQuery<MeQuery>(ME_QUERY);

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isAuthLoading = useReactiveVar(isAuthLoadingVar);
  const isRefreshingToken = useReactiveVar(isRefreshingTokenVar);

  const showLoginAndSignUp =
    !isLoggedIn && !isAuthLoading && !isRefreshingToken;

  const t = useTranslate();

  if (loading) {
    return null;
  }

  return (
    <>
      {isLoggedIn && data && (
        <Flex>
          <TopNavDropdown>
            <Button
              aria-label={t("navigation.profile")}
              onClick={() => redirectTo(NavigationPaths.Profile)}
              sx={{ fontSize: 17, textTransform: "none", color: "black" }}
            >
              <ProfileIcon
                color="primary"
                fontSize="small"
                sx={{ marginRight: 1 }}
              />
              {data.me.name}
            </Button>
          </TopNavDropdown>
        </Flex>
      )}

      {showLoginAndSignUp && (
        <Flex>
          <Button
            sx={{ color: "black" }}
            onClick={() => redirectTo(NavigationPaths.LogIn)}
          >
            {t("users.actions.logIn")}
          </Button>
          <Button
            sx={{ color: "black" }}
            onClick={() => redirectTo(NavigationPaths.SignUp)}
          >
            {t("users.actions.signUp")}
          </Button>
        </Flex>
      )}
    </>
  );
};

export default DesktopNav;
