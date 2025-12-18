// Types
import * as FeatureTypes from "./feature-types";

// API
import * as api from "./api";

// Feature Modules
import * as schemas from "./schemas";

// Components
import CreateModal from "./components/CreateModal";

// Hook
import { useCreateDrawer } from "./hooks/useCreateDrawer";

export type { FeatureTypes };
export default {
  api,
  schemas,

  hooks: {
    useCreateDrawer,
  },
  components: {
    CreateModal,
  },
};
