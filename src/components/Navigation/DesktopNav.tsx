import { useQuery, useReactiveVar } from "@apollo/client";
import {
  AccountCircle as ProfileIcon,
  ArrowDropDown,
} from "@mui/icons-material";
import { Button, IconButton, SxProps } from "@mui/material";
import { MouseEvent, useState } from "react";
import {
  isAuthLoadingVar,
  isLoggedInVar,
  isRefreshingTokenVar,
} from "../../client/cache";
import { ME_QUERY } from "../../client/users/queries";
import { NavigationPaths } from "../../constants/common";
import { useTranslate } from "../../hooks/common";
import { BLACK, WHITE } from "../../styles/theme";
import { MeQuery } from "../../types/user";
import { redirectTo } from "../../utils/common";
import Flex from "../Shared/Flex";
import Link from "../Shared/Link";
import SearchBar from "../Shared/SearchBar";
import TopNavDropdown from "./TopNavDropdown";

const PROFILE_BUTTON_STYLES: SxProps = {
  color: WHITE,
  fontSize: 17,
  fontWeight: "bold",
  textTransform: "none",
};

const DesktopNav = () => {
  const { data, loading } = useQuery<MeQuery>(ME_QUERY);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const isAuthLoading = useReactiveVar(isAuthLoadingVar);
  const isRefreshingToken = useReactiveVar(isRefreshingTokenVar);

  const showLoginAndSignUp =
    !isLoggedIn && !isAuthLoading && !isRefreshingToken;

  const t = useTranslate();

  const handleMenuButtonClick = (event: MouseEvent<HTMLButtonElement>) =>
    setMenuAnchorEl(event.currentTarget);

  const handleClose = () => setMenuAnchorEl(null);

  if (loading) {
    return null;
  }

  return (
    <Flex sx={{ justifyContent: "space-between", flexGrow: 1, marginLeft: 3 }}>
      <SearchBar />

      {isLoggedIn && data && (
        <Flex>
          <Link href={NavigationPaths.Profile}>
            <Button
              aria-label={t("navigation.profile")}
              sx={PROFILE_BUTTON_STYLES}
            >
              <ProfileIcon
                color="primary"
                fontSize="small"
                sx={{ marginRight: 1 }}
              />
              {data.me.name}
            </Button>
          </Link>

          <IconButton
            aria-label={t("labels.menuButton")}
            edge="end"
            onClick={handleMenuButtonClick}
          >
            <ArrowDropDown color="primary" />
          </IconButton>

          <TopNavDropdown anchorEl={menuAnchorEl} handleClose={handleClose} />
        </Flex>
      )}

      {showLoginAndSignUp && (
        <Flex>
          <Button
            onClick={() => redirectTo(NavigationPaths.LogIn)}
            sx={{ color: BLACK }}
          >
            {t("users.actions.logIn")}
          </Button>
          <Button
            onClick={() => redirectTo(NavigationPaths.SignUp)}
            sx={{ color: BLACK }}
          >
            {t("users.actions.signUp")}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default DesktopNav;
