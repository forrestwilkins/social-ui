import { useReactiveVar } from "@apollo/client";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import { isNavDrawerOpenVar } from "../../client/cache";
import { useAuthCheckQuery } from "../../hooks/auth";
import { useIsDesktop, useTranslate } from "../../hooks/common";
import theme from "../../styles/theme";
import BottomNav from "../Navigation/BottomNav";
import NavDrawer from "../Navigation/NavDrawer";
import TopNav from "../Navigation/TopNav";
import HeadContent from "./HeadContent";

const Layout = ({ children }: { children: ReactNode }) => {
  const isNavDrawerOpen = useReactiveVar(isNavDrawerOpenVar);

  const isDesktop = useIsDesktop();
  const t = useTranslate();

  useAuthCheckQuery();

  return (
    <>
      <Head>
        <HeadContent />
        <title>{t("brand")}</title>
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />

        {!isNavDrawerOpen && <TopNav />}
        {!isDesktop && <BottomNav />}
        <NavDrawer />

        <Container maxWidth="sm" sx={{ marginTop: 12 }}>
          <main role="main">{children}</main>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
