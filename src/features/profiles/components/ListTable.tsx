import { useTranslation } from "react-i18next";

import { Button, Table } from "antd";
import { FaPlus } from "react-icons/fa";

import { ListProfile } from "../types/models";

interface ComponentProps {
  profiles: ListProfile[];
  onProfileSelect: (profileId: string) => void;
}

const Component: React.FC<ComponentProps> = ({ profiles, onProfileSelect }) => {
  const { t } = useTranslation(["features"], {
    keyPrefix: "profiles.components.listTable",
  });

  return (
    <Table dataSource={profiles} rowKey="id" className="w-full">
      <Table.Column title={t("fields.name")} dataIndex="name" key="name" />
      <Table.Column
        title={t("fields.description")}
        dataIndex="description"
        key="description"
      />
      <Table.Column
        title={t("actions.select")}
        key="select"
        render={(_, record: ListProfile) => (
          <Button onClick={() => onProfileSelect(record.id)}>
            {t("actions.select")}
          </Button>
        )}
      />
    </Table>
  );
};

export default Component;
