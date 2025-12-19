// Types
import * as APITypes from "./types/api";
import * as ModelTypes from "./types/models";

// API
import * as api from "./api";

// Feature Modules
import * as schemas from "./schemas";

// Components
import ListTable from "./components/ListTable";
import CreateModal from "./components/CreateModal";

// Hook
import { useCreateDrawer } from "./hooks/useCreateDrawer";
import { useList } from "./hooks/useList";

export type { APITypes, ModelTypes };
export default {
  api,
  schemas,
  hooks: {
    useCreateDrawer,
    useList,
  },
  components: {
    CreateModal,
    ListTable,
  },
};
