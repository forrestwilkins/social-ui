import { useQuery, useReactiveVar } from "@apollo/client";
import {
  AccountCircle as ProfileIcon,
  ArrowDropDown,
} from "@mui/icons-material";
import { Button, IconButton, SxProps } from "@mui/material";
import { MouseEvent, useState } from "react";
import { isAuthLoadingVar, isLoggedInVar } from "../../client/cache";
import { ME_QUERY } from "../../client/users/queries";
import { NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { MeQuery } from "../../types/user";
import { redirectTo } from "../../utils/common";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import SearchBar from "../Shared/SearchBar";
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

const TopNavDesktop = () => {
  const { data, loading } = useQuery<MeQuery>(ME_QUERY);
  const isAuthLoading = useReactiveVar(isAuthLoadingVar);
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const t = useTranslate();

  const showLoginAndSignUp = !isLoggedIn && !isAuthLoading;

  const handleMenuButtonClick = (event: MouseEvent<HTMLButtonElement>) =>
    setMenuAnchorEl(event.currentTarget);

  const handleClose = () => setMenuAnchorEl(null);

  if (loading) {
    return null;
  }

  return (
    <Flex sx={TOP_NAV_STYLES}>
      <SearchBar />

      {isLoggedIn && data && (
        <Flex>
          <Link href={NavigationPaths.Profile}>
            <Button
              aria-label={t("navigation.profile")}
              sx={PROFILE_BUTTON_STYLES}
            >
              <ProfileIcon fontSize="small" sx={{ marginRight: 1 }} />
              {data.me.name}
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
