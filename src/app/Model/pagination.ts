import { Teacher } from "./Teacher"

export interface IPagination {
  pageIndex: number
  pageSize: number
  count: number
  data: Teacher[]
}
