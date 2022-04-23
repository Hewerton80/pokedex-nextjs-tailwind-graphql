export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'warning'
  | 'info'
  | 'dark'
  | 'light'

export type Callback = () => void
export interface ISelectOption {
  text: string
  value: string
}
export interface IPagination {
  totalPages: number
  totalRecords: number
}
export interface IQueryParansPaginations {
  page?: number
  perPage?: number
}

export interface IPaginationRecords<T = any> {
  docs: T[]
  currentPage: number
  perPage: number
  total: number
  totalPages: number
}

export interface File extends Blob {
  lastModified: number
  name: string
}

export enum StateStatusEnum {
  idle = 'idle',
  loading = 'loading',
  error = 'error',
  success = 'success',
}
