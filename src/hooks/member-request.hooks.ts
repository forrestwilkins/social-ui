import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_MEMBER_REQUEST_MUTATION,
  DELETE_MEMBER_REQUEST_MUTATION,
} from "../client/groups/group.mutations";
import { MEMBER_REQUEST_QUERY } from "../client/groups/group.queries";
import {
  CreateMemberRequestMutation,
  MemberRequest,
  MemberRequestQuery,
} from "../types/group.types";
import { filterInactiveQueries } from "../utils/apollo.utils";
import { useMeQuery } from "./user.hooks";

export const useMemberRequestQuery = (
  groupId: number
): [MemberRequest | undefined | null, boolean] => {
  const [me] = useMeQuery();
  const { data, loading } = useQuery<MemberRequestQuery>(MEMBER_REQUEST_QUERY, {
    variables: {
      userId: me?.id,
      groupId,
    },
    skip: !me,
  });
  return [data?.memberRequest, loading];
};

export const useCreateMemberRequestMutation = (): [
  typeof _createMemberRequest,
  boolean
] => {
  const [createMemberRequest, { loading }] =
    useMutation<CreateMemberRequestMutation>(CREATE_MEMBER_REQUEST_MUTATION);

  const [me] = useMeQuery();

  /**
   * TODO: Determine how to update queries for single objects
   * TODO: Directly update cache after createMemberRequest mutation
   */
  const _createMemberRequest = async (groupId: number) => {
    const { data } = await createMemberRequest({
      variables: { groupId, userId: me?.id },
      refetchQueries: filterInactiveQueries([MEMBER_REQUEST_QUERY]),
    });
    return data?.createMemberRequest;
  };

  return [_createMemberRequest, loading];
};

export const useDeleteMemberRequestMutation = (): [
  typeof _deleteMemberRequest,
  boolean
] => {
  const [deleteMemberRequest, { loading }] = useMutation(
    DELETE_MEMBER_REQUEST_MUTATION
  );

  /** TODO: Directly update cache after deleteMemberRequest mutation */
  const _deleteMemberRequest = async (id: number) => {
    await deleteMemberRequest({
      variables: { id },
      refetchQueries: filterInactiveQueries([MEMBER_REQUEST_QUERY]),
    });
  };

  return [_deleteMemberRequest, loading];
};
