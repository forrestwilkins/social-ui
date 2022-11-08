import { useMutation } from "@apollo/client";
import produce from "immer";
import {
  CANCEL_MEMBER_REQUEST_MUTATION,
  CREATE_MEMBER_REQUEST_MUTATION,
} from "../client/groups/group.mutations";
import {
  MEMBER_REQUESTS_QUERY,
  MEMBER_REQUEST_QUERY,
} from "../client/groups/group.queries";
import {
  CancelMemberRequestMutation,
  CreateMemberRequestMutation,
  MemberRequestQuery,
  MemberRequestsQuery,
} from "../types/generated.types";

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
        const { createMemberRequest } = data;
        const variables = { groupId: createMemberRequest.group.id };
        cache.writeQuery<MemberRequestQuery>({
          query: MEMBER_REQUEST_QUERY,
          data: { memberRequest: createMemberRequest },
          variables,
        });
        cache.updateQuery<MemberRequestsQuery>(
          { query: MEMBER_REQUESTS_QUERY, variables },
          (memberRequestsData) =>
            produce(memberRequestsData, (draft) => {
              draft?.memberRequests.unshift(createMemberRequest);
            })
        );
        cache.modify({
          id: cache.identify({ ...createMemberRequest.group }),
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
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const variables = {
          groupId: data.cancelMemberRequest.id,
        };
        cache.writeQuery<MemberRequestQuery>({
          query: MEMBER_REQUEST_QUERY,
          data: { memberRequest: null },
          variables,
        });
        cache.updateQuery<MemberRequestsQuery>(
          { query: MEMBER_REQUESTS_QUERY, variables },
          (memberRequestsData) =>
            produce(memberRequestsData, (draft) => {
              if (!draft) {
                return;
              }
              const index = draft.memberRequests.findIndex((p) => p.id === id);
              draft.memberRequests.splice(index, 1);
            })
        );
        cache.modify({
          id: cache.identify(data.cancelMemberRequest),
          fields: {
            memberRequestCount(existingCount: number) {
              return existingCount - 1;
            },
          },
        });
      },
    });
  };

  return [_cancelMemberRequest, loading];
};
