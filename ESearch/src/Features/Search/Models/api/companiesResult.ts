import { Company } from "./company"

export interface CompaniesResult {
    total_count: number
    results: Company[]
  }