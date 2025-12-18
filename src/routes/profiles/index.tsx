import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

import ProfilesFeature from "../../features/profiles";

import { Button, Divider, Modal, Tooltip } from "antd";
import { FiActivity, FiSettings, FiUser, FiShield } from "react-icons/fi";
import { FaPlus, FaBookOpen, FaInbox } from "react-icons/fa";

export const Route = createFileRoute("/profiles/")({
  component: LandingPage,
});

function LandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation(["profiles"], { keyPrefix: "select" });

  const {
    state: createProfileDrawerState,
    setState: setCreateProfileDrawerState,
    openDrawer: openCreateProfileDrawer,
    closeDrawer: closeCreateProfileDrawer,
    createProfile,
  } = ProfilesFeature.hooks.useCreateDrawer({
    onSuccess: (profile) => {
      navigate({
        to: "/profiles/$profileId",
        params: { profileId: profile.id },
      });
    },
  });

  return (
    <main className="min-h-screen bg-slate-800 text-gray-100 flex flex-col items-center py-24 px-4">
      {/* Hero */}
      <section className="max-w-2xl text-center">
        <h1 className="text-4xl font-semibold tracking-tight">{t("title")}</h1>

        <p className="mt-4 text-lg text-gray-300">{t("description")}</p>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          <Button
            onClick={openCreateProfileDrawer}
            icon={<FaPlus />}
            type="primary"
            size="large"
          >
            {t("actions.create")}
          </Button>

          <Button
            icon={<FaBookOpen />}
            size="large"
            onClick={() => navigate({ to: "/documentation/profiles" })}
          >
            {t("actions.docs")}
          </Button>

          <Button
            icon={<FaInbox />}
            onClick={() => navigate({ to: "/profiles/import" })}
            size="large"
          >
            {t("actions.import")}
          </Button>
        </div>
      </section>

      <Divider className="my-16 border-slate-700" />

      {/* Footer hint / empty state reinforcement */}
      <section className="text-center text-gray-400 max-w-xl">
        <p>{t("footer.hint")}</p>
      </section>

      <ProfilesFeature.components.CreateModal
        state={createProfileDrawerState}
        setState={setCreateProfileDrawerState}
        onCreate={createProfile}
        onClose={closeCreateProfileDrawer}
      />
    </main>
  );
}
