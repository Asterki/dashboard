import { useTranslation } from "react-i18next";

import { Button, Drawer, Form, Input } from "antd";
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
      <Form layout="vertical">
        <Form.Item label={t("fields.name.label")} required>
          <Input
            value={state.name}
            placeholder={t("fields.name.placeholder")}
            onChange={(e) =>
              setState((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </Form.Item>

        <Form.Item label={t("fields.description.label")}>
          <Input.TextArea
            value={state.description}
            placeholder={t("fields.description.placeholder")}
            onChange={(e) =>
              setState((prev) => ({ ...prev, description: e.target.value }))
            }
            rows={4}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default Component;
