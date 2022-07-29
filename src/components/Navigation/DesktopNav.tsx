import { useReactiveVar } from "@apollo/client";
import {
  FavoriteBorderOutlined as FavoritesIcon,
  PersonOutline as ProfileIcon,
  ShoppingBagOutlined as CartIcon,
} from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../../client/cache";
import { NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { redirectTo } from "../../utils/common";
import Flex from "../Shared/Flex";
import TopNavDropdown from "./TopNavDropdown";

const DesktopNav = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isAuthLoading = useReactiveVar(isAuthLoadingVar);
  const isRefreshingToken = useReactiveVar(isRefreshingTokenVar);

  const showLoginAndSignUp =
    !isLoggedIn && !isAuthLoading && !isRefreshingToken;

  const t = useTranslate();

  return (
    <>
      {isLoggedIn && (
        <Flex>
          <TopNavDropdown>
            <IconButton
              aria-label={t("navigation.profile")}
              onClick={() => redirectTo(NavigationPaths.Profile)}
              sx={{ marginLeft: 1 }}
            >
              <ProfileIcon sx={{ color: "black" }} />
            </IconButton>
          </TopNavDropdown>

          <IconButton
            aria-label={t("navigation.favorites")}
            onClick={() => redirectTo(NavigationPaths.Home)}
            sx={{ marginLeft: 1 }}
          >
            <FavoritesIcon sx={{ color: "black" }} />
          </IconButton>

          <IconButton
            aria-label={t("navigation.cart")}
            onClick={() => redirectTo(NavigationPaths.Home)}
            sx={{ marginLeft: 1 }}
          >
            <CartIcon sx={{ color: "black" }} />
          </IconButton>
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
            {t("users.actions.joinUs")}
          </Button>
        </Flex>
      )}
    </>
  );
};

export default DesktopNav;
