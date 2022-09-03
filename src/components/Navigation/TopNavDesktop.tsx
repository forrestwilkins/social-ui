import { useReactiveVar } from "@apollo/client";
import { ArrowDropDown } from "@mui/icons-material";
import { Button, IconButton, SxProps } from "@mui/material";
import { MouseEvent, useState } from "react";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../../client/cache";
import { NavigationPaths, ResourceNames } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { useMeQuery } from "../../hooks/user";
import { redirectTo } from "../../utils/common";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import SearchBar from "../Shared/SearchBar";
import UserAvatar from "../Users/Avatar";
import TopNavDropdown from "./TopNavDropdown";

const PROFILE_BUTTON_STYLES: SxProps = {
  fontSize: 17,
  fontWeight: "bold",
  textTransform: "none",
};

const TOP_NAV_STYLES: SxProps = {
  justifyContent: "space-between",
  flexGrow: 1,
  marginLeft: 3,
};

const USER_AVATAR_STYLES: SxProps = { width: 24, height: 24, marginRight: 1.3 };

const TopNavDesktop = () => {
  const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | null>(null);

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [me, loading] = useMeQuery({ skip: !isLoggedIn });

  const isAuthLoading = useReactiveVar(isAuthLoadingVar);
  const isRefreshingToken = useReactiveVar(isRefreshingTokenVar);

  const showLoginAndSignUp =
    !isLoggedIn && !isAuthLoading && !isRefreshingToken;
  const userProfilePath = `/${ResourceNames.User}/${me?.name}/profile`;

  const t = useTranslate();

  const handleMenuButtonClick = (event: MouseEvent<HTMLButtonElement>) =>
    setMenuAnchorEl(event.currentTarget);

  const handleClose = () => setMenuAnchorEl(null);

  if (loading) {
    return null;
  }

  return (
    <Flex sx={TOP_NAV_STYLES}>
      <SearchBar />

      {isLoggedIn && (
        <Flex>
          <Link href={userProfilePath}>
            <Button
              aria-label={t("navigation.profile")}
              sx={PROFILE_BUTTON_STYLES}
            >
              <UserAvatar sx={USER_AVATAR_STYLES} />
              {me?.name}
            </Button>
          </Link>

          <IconButton
            aria-label={t("labels.menuButton")}
            edge="end"
            onClick={handleMenuButtonClick}
          >
            <ArrowDropDown />
          </IconButton>

          <TopNavDropdown anchorEl={menuAnchorEl} handleClose={handleClose} />
        </Flex>
      )}

      {showLoginAndSignUp && (
        <Flex>
          <Button onClick={() => redirectTo(NavigationPaths.LogIn)}>
            {t("users.actions.logIn")}
          </Button>
          <Button onClick={() => redirectTo(NavigationPaths.SignUp)}>
            {t("users.actions.signUp")}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default TopNavDesktop;
