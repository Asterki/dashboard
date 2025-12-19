import { useTranslation } from "react-i18next";
import { App } from "antd";
import { useState, useCallback } from "react";

import ProfilesFeature, { ModelTypes, APITypes } from "../";

export type CreateProfileDrawerState = Omit<
  APITypes.CreateRequestInput,
  never
> & {
  isOpen: boolean;
  loading: boolean;
};

export function useCreateDrawer({
  onSuccess,
}: {
  onSuccess: (profile: ModelTypes.IProfile) => void;
}) {
  const { t } = useTranslation(["main"]);
  const { message } = App.useApp();

  const defaultState: CreateProfileDrawerState = {
    isOpen: false,
    loading: false,
    name: "",
    description: "",
  };

  const [state, setState] = useState<CreateProfileDrawerState>(defaultState);

  const createProfile = useCallback(async () => {
    if (state.loading) return;

    const parsedData = ProfilesFeature.schemas.createSchema.safeParse(state);
    if (!parsedData.success) {
      for (const issue of parsedData.error.issues) {
        message.warning(
          t(
            `features:vaults.components.create-modal.messages.${issue.message}`,
          ),
        );
      }
      return;
    }

    setState((prev) => ({
      ...prev,
      loading: true,
    }));
    const result = await ProfilesFeature.api.create(parsedData.data);
    if (result.status == "success" && result.profile !== undefined) {
      message.success(
        t("features:profiles.components.create-modal.messages.success"),
      );
      setState(defaultState);

      // Then we add the variant to the list
      if (onSuccess) onSuccess(result.profile);
    } else {
      setState((prev) => ({
        ...prev,
        loading: false,
      }));
      message.error(t(`error-messages:${result.status}`));
    }
  }, [state, message, t]);

  const openDrawer = useCallback(
    () => setState((prev) => ({ ...prev, isOpen: true })),
    [],
  );
  const closeDrawer = useCallback(() => setState(defaultState), []);

  return {
    state,
    setState,
    createProfile,
    openDrawer,
    closeDrawer,
  };
}
