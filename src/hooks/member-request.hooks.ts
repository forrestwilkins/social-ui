import { useMutation } from "@apollo/client";
import {
  CANCEL_MEMBER_REQUEST_MUTATION,
  CREATE_MEMBER_REQUEST_MUTATION,
} from "../client/groups/group.mutations";
import {
  GROUP_QUERY,
  MEMBER_REQUESTS_QUERY,
  MEMBER_REQUEST_QUERY,
} from "../client/groups/group.queries";
import {
  CancelMemberRequestMutation,
  CreateMemberRequestMutation,
  MemberRequest,
  MemberRequestQuery,
} from "../types/generated.types";
import { Group } from "../types/group.types";
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
        if (!data?.createMemberRequest) {
          return;
        }
        const variables = {
          groupId: data.createMemberRequest.group.id,
        };
        cache.writeQuery<MemberRequestQuery>({
          query: MEMBER_REQUEST_QUERY,
          data: { memberRequest: data.createMemberRequest },
          variables,
        });
        updateQuery<MemberRequest[]>(
          { query: MEMBER_REQUESTS_QUERY, variables },
          (draft) => {
            draft.unshift(data.createMemberRequest as MemberRequest);
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
