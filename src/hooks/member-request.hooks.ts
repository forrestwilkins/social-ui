import { useMutation } from "@apollo/client";
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
import {
  ApproveMemberRequestMutation,
  CancelMemberRequestMutation,
  CreateMemberRequestMutation,
  Group,
  MemberRequest,
} from "../types/group.types";
import { updateQuery } from "../utils/apollo.utils";

export const useCreateMemberRequestMutation = (): [
  typeof _createMemberRequest,
  boolean
] => {
  const [createMemberRequest, { loading }] =
    useMutation<CreateMemberRequestMutation>(CREATE_MEMBER_REQUEST_MUTATION);

  const _createMemberRequest = async (groupId: number) => {
    const { data } = await createMemberRequest({
      variables: { groupId },
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const variables = {
          groupId: data.createMemberRequest.group.id,
        };
        updateQuery<MemberRequest>(
          { query: MEMBER_REQUEST_QUERY, variables },
          () => data.createMemberRequest
        );
        updateQuery<MemberRequest[]>(
          { query: MEMBER_REQUESTS_QUERY, variables },
          (draft) => {
            draft.unshift(data.createMemberRequest);
          }
        );
        cache.modify({
          id: cache.identify({ ...data.createMemberRequest.group }),
          fields: {
            memberRequestCount(existingCount: number) {
              return existingCount + 1;
            },
          },
        });
      },
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
        const variables = {
          groupId: data.approveMemberRequest.group.id,
        };
        updateQuery<MemberRequest>(
          { query: MEMBER_REQUEST_QUERY, variables },
          (draft) => {
            draft.status = "approved";
          }
        );
        updateQuery<MemberRequest[]>(
          { query: MEMBER_REQUESTS_QUERY, variables },
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
        const variables = {
          groupId: data.cancelMemberRequest.id,
        };
        updateQuery<MemberRequest>(
          { query: MEMBER_REQUEST_QUERY, variables },
          () => null
        );
        updateQuery<MemberRequest[]>(
          { query: MEMBER_REQUESTS_QUERY, variables },
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
    });
  };

  return [_cancelMemberRequest, loading];
};
