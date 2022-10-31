import { useMutation, useQuery } from "@apollo/client";
import {
  APPROVE_MEMBER_REQUEST_MUTATION,
  CANCEL_MEMBER_REQUEST_MUTATION,
  CREATE_MEMBER_REQUEST_MUTATION,
} from "../client/groups/group.mutations";
import {
  GROUP_QUERY,
  MEMBER_REQUESTS_QUERY,
  MEMBER_REQUEST_QUERY,
} from "../client/groups/group.queries";
import { TypeNames } from "../constants/common.constants";
import {
  ApproveMemberRequestMutation,
  CancelMemberRequestMutation,
  CreateMemberRequestMutation,
  Group,
  MemberRequest,
  MemberRequestQuery,
} from "../types/group.types";
import { filterInactiveQueries, updateQuery } from "../utils/apollo.utils";
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

  // TODO: Refactor so that MeQuery is unneeded
  const [me] = useMeQuery();

  const _createMemberRequest = async (groupId: number) => {
    const { data } = await createMemberRequest({
      variables: { memberRequestData: { groupId, userId: me?.id } },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        updateQuery<MemberRequest[]>(
          {
            query: MEMBER_REQUESTS_QUERY,
            variables: { groupId: data.createMemberRequest.group.id },
          },
          (draft) => {
            draft.unshift(data.createMemberRequest);
          }
        );
        cache.modify({
          id: cache.identify({
            __typename: TypeNames.Group,
            id: data.createMemberRequest.group.id,
          }),
          fields: {
            memberRequestCount(existingCount: number) {
              return existingCount + 1;
            },
          },
        });
      },
      // TODO: Determine how to update queries for single objects
      // Can likely use writeQuery here
      refetchQueries: filterInactiveQueries([MEMBER_REQUEST_QUERY]),
    });
    return data?.createMemberRequest;
  };

  return [_createMemberRequest, loading];
};

export const useApproveMemberRequestMutation = (): [
  typeof _approve,
  boolean
] => {
  const [approve, { loading }] = useMutation<ApproveMemberRequestMutation>(
    APPROVE_MEMBER_REQUEST_MUTATION
  );

  const _approve = async (id: number) =>
    // TODO: Determine if approveMemberRequest should return member request
    // with group member as a field instead of just the group member alone
    await approve({
      variables: { id },
      update(_, { data }) {
        if (!data) {
          return;
        }
        updateQuery<MemberRequest[]>(
          {
            query: MEMBER_REQUESTS_QUERY,
            variables: { groupId: data.approveMemberRequest.group.id },
          },
          (draft) => {
            const index = draft.findIndex((p) => p.id === id);
            draft.splice(index, 1);
          }
        );
        updateQuery<Group>(
          {
            query: GROUP_QUERY,
            variables: { name: data.approveMemberRequest.group.name },
          },
          (draft) => {
            draft.members.unshift(data.approveMemberRequest);
            draft.memberRequestCount -= 1;
            draft.memberCount += 1;
          }
        );
      },
      // TODO: Update cache directly - can likely use writeQuery here
      refetchQueries: filterInactiveQueries([MEMBER_REQUEST_QUERY]),
    });

  return [_approve, loading];
};

export const useCancelMemberRequestMutation = (): [
  typeof _cancelMemberRequest,
  boolean
] => {
  const [cancelMemberRequest, { loading }] =
    useMutation<CancelMemberRequestMutation>(CANCEL_MEMBER_REQUEST_MUTATION);

  const _cancelMemberRequest = async (id: number) => {
    await cancelMemberRequest({
      variables: { id },
      update(_, { data }) {
        if (!data) {
          return;
        }
        updateQuery<MemberRequest[]>(
          {
            query: MEMBER_REQUESTS_QUERY,
            variables: { groupId: data.cancelMemberRequest.id },
          },
          (draft) => {
            const index = draft.findIndex((p) => p.id === id);
            draft.splice(index, 1);
          }
        );
        updateQuery<Group>(
          {
            query: GROUP_QUERY,
            variables: { name: data.cancelMemberRequest.name },
          },
          (draft) => {
            draft.memberRequestCount -= 1;
          }
        );
      },
      // TODO: Determine how to update queries for single objects
      refetchQueries: filterInactiveQueries([MEMBER_REQUEST_QUERY]),
    });
  };

  return [_cancelMemberRequest, loading];
};
