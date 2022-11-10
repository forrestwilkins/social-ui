import { ApolloCache } from "@apollo/client";
import { Button, Typography } from "@mui/material";
import produce from "immer";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { toastVar } from "../../../client/cache";
import { GROUP_PROFILE_FRAGMENT } from "../../../client/groups/group.fragments";
import { POSTS_QUERY } from "../../../client/posts/post.queries";
import { USER_PROFILE_FRAGMENT } from "../../../client/users/user.fragments";
import PostForm from "../../../components/Posts/PostForm";
import ProgressBar from "../../../components/Shared/ProgressBar";
import {
  NavigationPaths,
  TypeNames,
} from "../../../constants/common.constants";
import { useTranslate } from "../../../hooks/common.hooks";
import {
  GroupProfileFragment,
  Post,
  PostsQuery,
  useDeletePostMutation,
  usePostQuery,
  UserProfileFragment,
} from "../../../types/generated.types";
import { redirectTo } from "../../../utils/common.utils";

export const removePost =
  (id: number, userId: number, groupId?: number) =>
  (cache: ApolloCache<any>) => {
    cache.updateQuery<PostsQuery>({ query: POSTS_QUERY }, (postsData) =>
      produce(postsData, (draft) => {
        if (!draft) {
          return;
        }
        const index = draft.posts.findIndex((p) => p.id === id);
        draft.posts.splice(index, 1);
      })
    );
    cache.updateFragment<UserProfileFragment>(
      {
        id: cache.identify({ id: userId, __typename: TypeNames.User }),
        fragment: USER_PROFILE_FRAGMENT,
        fragmentName: "UserProfile",
      },
      (data) =>
        produce(data, (draft) => {
          if (!draft) {
            return;
          }
          const index = draft.posts.findIndex((p) => p.id === id);
          draft.posts.splice(index, 1);
        })
    );
    if (!groupId) {
      return;
    }
    cache.updateFragment<GroupProfileFragment>(
      {
        id: cache.identify({ id: groupId, __typename: TypeNames.Group }),
        fragment: GROUP_PROFILE_FRAGMENT,
        fragmentName: "GroupProfile",
      },
      (data) =>
        produce(data, (draft) => {
          if (!draft) {
            return;
          }
          const index = draft.posts.findIndex((p) => p.id === id);
          draft.posts.splice(index, 1);
        })
    );
  };

const EditPostPage: NextPage = () => {
  const { query } = useRouter();
  const id = parseInt(String(query?.id));
  const { data, loading, error } = usePostQuery({
    variables: { id },
    skip: !id,
  });

  const [deletePost] = useDeletePostMutation();

  const t = useTranslate();

  if (error) {
    return <Typography>{t("errors.somethingWentWrong")}</Typography>;
  }

  if (loading) {
    return <ProgressBar />;
  }

  if (!data) {
    return null;
  }

  const handleDeleteButtonClick = async () => {
    const {
      post: { group, user },
    } = data;
    try {
      await deletePost({
        variables: { id },
        update: removePost(id, user.id, group?.id),
      });
      redirectTo(NavigationPaths.Home);
    } catch {
      toastVar({
        status: "error",
        title: t("errors.somethingWentWrong"),
      });
    }
  };

  return (
    <>
      <PostForm editPost={data.post as Post} sx={{ marginBottom: 2.5 }} />

      <Button
        color="error"
        fullWidth
        onClick={() =>
          window.confirm(t("prompts.deleteItem", { item: "post" })) &&
          handleDeleteButtonClick()
        }
        sx={{ marginTop: 1.5 }}
        variant="outlined"
      >
        {t("actions.delete")}
      </Button>
    </>
  );
};

export default EditPostPage;
