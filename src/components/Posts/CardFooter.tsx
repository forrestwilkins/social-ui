import { Comment, Favorite, Reply } from "@mui/icons-material";
import { CardActions, SxProps } from "@mui/material";
import { useTranslate } from "../../hooks/common";
import { inDevToast } from "../../utils/common";
import CardFooterButton from "../Shared/CardFooterButton";

const SHARED_ICON_STYLES: SxProps = {
  marginRight: "0.4ch",
};

const ROTATED_ICON_STYLES = {
  ...SHARED_ICON_STYLES,
  transform: "rotateY(180deg)",
};

const PostCardFooter = () => {
  const t = useTranslate();

  return (
    <CardActions sx={{ justifyContent: "space-around" }} onClick={inDevToast}>
      <CardFooterButton>
        <Favorite sx={SHARED_ICON_STYLES} />
        {t("posts.actions.like")}
      </CardFooterButton>
      <CardFooterButton>
        <Comment sx={ROTATED_ICON_STYLES} />
        {t("posts.actions.comment")}
      </CardFooterButton>
      <CardFooterButton>
        <Reply sx={ROTATED_ICON_STYLES} />
        {t("posts.actions.share")}
      </CardFooterButton>
    </CardActions>
  );
};

export default PostCardFooter;
