import { useMutation } from "@apollo/client";
import produce from "immer";
import { GROUP_SUMMARY_FRAGMENT } from "../client/groups/group.fragments";
import {
  CANCEL_MEMBER_REQUEST_MUTATION,
  CREATE_MEMBER_REQUEST_MUTATION,
} from "../client/groups/group.mutations";
import {
  MEMBER_REQUESTS_QUERY,
  MEMBER_REQUEST_QUERY,
} from "../client/groups/group.queries";
import { TypeNames } from "../constants/common.constants";
import {
  CancelMemberRequestMutation,
  CreateMemberRequestMutation,
  GroupSummaryFragment,
  MemberRequest,
  MemberRequestQuery,
} from "../types/generated.types";
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
      update(cache, { data }) {
        if (!data) {
          return;
        }
        const variables = {
          groupId: data.cancelMemberRequest.id,
        };
        updateQuery<MemberRequest[]>(
          { query: MEMBER_REQUESTS_QUERY, variables },
          (draft) => {
            const index = draft.findIndex((p) => p.id === id);
            draft.splice(index, 1);
          }
        );
        cache.writeQuery<MemberRequestQuery>({
          query: MEMBER_REQUEST_QUERY,
          data: { memberRequest: null },
          variables,
        });
        cache.updateFragment<GroupSummaryFragment>(
          {
            id: cache.identify({
              id: data.cancelMemberRequest.id,
              __typename: TypeNames.Group,
            }),
            fragment: GROUP_SUMMARY_FRAGMENT,
            fragmentName: "GroupSummary",
          },
          (data) =>
            produce(data, (draft) => {
              if (!draft) {
                return;
              }
              draft.memberRequestCount -= 1;
            })
        );
      },
    });
  };

  return [_cancelMemberRequest, loading];
};
