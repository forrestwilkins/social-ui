import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import { useAuthCheckQuery } from "../../hooks/auth";
import { useIsDesktop, useTranslate } from "../../hooks/common";
import theme from "../../styles/theme";
import BottomNav from "../Navigation/BottomNav";
import NavDrawer from "../Navigation/NavDrawer";
import TopNav from "../Navigation/TopNav";
import HeadContent from "./HeadContent";

const Layout = ({ children }: { children: ReactNode }) => {
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

        <TopNav />
        <NavDrawer />
        {!isDesktop && <BottomNav />}

        <Container maxWidth="sm" sx={{ paddingTop: 10.5, paddingBottom: 24 }}>
          <main role="main">{children}</main>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
