import * as store from './store'
import * as db from './db'
import * as actions from './actions'

const VaultsFeature = {
  store,
  db,
  actions,
}
export type { Vault } from './types'
export default VaultsFeature
