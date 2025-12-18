import { useTranslation } from "react-i18next";

import { Button, Drawer, Modal } from "antd";
import { FaPlus } from "react-icons/fa";

import { CreateProfileDrawerState } from "../hooks/useCreateDrawer";

interface CreateDrawerProps {
  state: CreateProfileDrawerState;
  setState: React.Dispatch<React.SetStateAction<CreateProfileDrawerState>>;
  onClose: () => void;
  onCreate: () => Promise<void>;
}

const Component: React.FC<CreateDrawerProps> = ({
  state,
  setState,
  onClose,
  onCreate,
}) => {
  const { t } = useTranslation(["features"], {
    keyPrefix: "profiles.components.createDrawer",
  });

  return (
    <Drawer
      onClose={onClose}
      title={t("title")}
      open={state.isOpen ?? false}
      size="large"
      extra={
        <Button type="primary" onClick={onCreate} icon={<FaPlus />}>
          {t("actions.create")}
        </Button>
      }
    >
      {/* Drawer content goes here */}
    </Drawer>
  );
};

export default Component;
