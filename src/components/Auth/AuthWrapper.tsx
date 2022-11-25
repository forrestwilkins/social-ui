// TODO: Refactor to avoid duplicating authentication state

import { Container } from "@mui/material";
import { ReactNode, useEffect } from "react";
import { isAuthLoadingVar, isLoggedInVar } from "../../apollo/cache";
import { useAuthCheckQuery } from "../../apollo/gen";
import TopNav from "../Navigation/TopNav";
import ProgressBar from "../Shared/ProgressBar";

interface Props {
  children: ReactNode;
}

const AuthWrapper = ({ children }: Props) => {
  const { loading } = useAuthCheckQuery({
    onCompleted({ authCheck }) {
      isLoggedInVar(authCheck);
    },
  });

  useEffect(() => {
    isAuthLoadingVar(loading);
  }, [loading]);

  if (loading) {
    return (
      <>
        <TopNav />
        <Container maxWidth="sm">
          <ProgressBar />
        </Container>
      </>
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
