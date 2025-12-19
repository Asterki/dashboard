import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { App } from "antd";

import ProfilesFeature, { ModelTypes, APITypes } from "../";
import { IProfile } from "../types/models";

export type NullableProfielsListState = {
  [K in keyof APITypes.ListProfilesInput]?:
    | APITypes.ListProfilesInput[K]
    | null;
};

export function useList() {
  const { t } = useTranslation(["main"]);
  const { message } = App.useApp();

  const [profilessListState, setProfilesListState] = useState<
    Omit<APITypes.ListProfilesInput, never> & { loading: boolean }
  >({
    loading: true,
    fields: ["name", "description", "name", "_id"],
    count: 50,
    page: 0,
  });

  const [profiles, setProfiles] = useState<{
    totalProfiles: number;
    profiles: ModelTypes.ListProfile[];
  }>({
    totalProfiles: 0,
    profiles: [],
  });

  const fetchProfiles = useCallback(
    async ({
      count = profilessListState.count,
      page = profilessListState.page,
      includeDeleted = profilessListState.includeDeleted,
      search = profilessListState.search,
      filters = profilessListState.filters,
    }: NullableProfielsListState = {}) => {
      setProfilesListState((prev) => ({ ...prev, loading: true }));

      const result = await ProfilesFeature.api.list();

      if (result.status === "success") {
        setProfilesListState((prev) => {
          return {
            ...prev,
            count: count as number,
            page: page as number,
            search: search == null ? undefined : search,
            filters: filters == null ? undefined : filters,
            includeDeleted: includeDeleted == null ? undefined : includeDeleted,
            loading: false,
          };
        });

        setProfiles({
          profiles: result.profiles!.map((pro: IProfile) => ({
            id: pro.id,
            name: pro.name,
            description: pro.description,
          })),
          totalProfiles: result.profiles?.length ?? 0,
        });
      } else {
        if (message && t) {
          message.error(t(`error-messages:${result.status}`));
        }
        setProfilesListState((prev) => ({ ...prev, loading: false }));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [profilessListState, message, t],
  );

  return {
    profilessListState,
    profiles,
    fetchProfiles,
    //setAccountsListState, // expose if you want external control
  };
}
