import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import Head from "next/head";
import { ReactNode } from "react";
import { useAuthCheckQuery } from "../../hooks/auth";
import {
  useAboveBreakpoint,
  useIsDesktop,
  useTranslate,
} from "../../hooks/common";
import theme from "../../theme";
import BottomNav from "../Navigation/BottomNav";
import LeftNav from "../Navigation/LeftNav";
import NavDrawer from "../Navigation/NavDrawer";
import ScrollToTop from "../Navigation/ScrollToTop";
import TopNav from "../Navigation/TopNav";
import Toast from "../Shared/Toast";
import HeadContent from "./HeadContent";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  const isDesktop = useIsDesktop();
  const isLarge = useAboveBreakpoint("lg");
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
        {isLarge && <LeftNav />}

        <Container maxWidth="sm">
          <main role="main">
            {children}

            <Toast />
            {isDesktop && <ScrollToTop />}
          </main>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Layout;
