import { db } from './db'

export const create = async (vault: {
  name: string
  description: string
  image?: string
  features: {
    notes?: boolean
    tasks?: boolean
    calendar?: boolean
    pomodoro?: boolean
  }
}): Promise<number> => {
  const createdAt = new Date()
  const updatedAt = new Date()

  // TODO: Create the features listed in the vault

  const id = await db.vaults.add({
    name: vault.name,
    description: vault.description,
    createdAt: createdAt,
    updatedAt: updatedAt,
    image: vault.image || '',
  })
  return id
}

export const list = async ({
  page = 1,
  pageSize = 10,
  sortBy = 'createdAt',
  sortOrder = 'desc',
  filter = '',
}): Promise<Array<any>> => {
  const vaults = await db.vaults
    .where('name')
    .startsWithIgnoreCase(filter)
    .or('description')
    .startsWithIgnoreCase(filter)
    .toArray()

  const sortedVaults = vaults.sort((a, b) => {
    if (sortOrder === 'asc') {
      return a[sortBy] > b[sortBy] ? 1 : -1
    } else {
      return a[sortBy] < b[sortBy] ? 1 : -1
    }
  })

  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  return sortedVaults.slice(startIndex, endIndex)
}
