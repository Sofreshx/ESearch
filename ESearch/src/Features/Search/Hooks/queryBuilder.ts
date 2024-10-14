import { Company } from "../Models/company";
import { Operations } from "../Models/companyFilter";
import { useState } from "react";

export interface Filter {
  operation: Operations;
  field?: keyof Company;
  value?: any;
}

export const useQueryBuilder = (baseUrl: string) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const addFilter = (filter: Filter) => {
    setFilters((prevFilters) => [...prevFilters, filter]);
  };

  const removeFilter = (operation: Operations, field?: keyof Company) => {
    setFilters((prevFilters) =>
      prevFilters.filter((f) => f.operation !== operation || f.field !== field)
    );
  };

  const buildQuery = (): string => {
    let queryParts: string[] = [];

    for (const filter of filters) {
      switch (filter.operation) {
        case Operations.Where:
          if (filter.field && filter.value) {
            queryParts.push(buildWhereClause(filter.field, filter.value));
          }
          break;
        case Operations.OrderBy:
          if (filter.field) {
            queryParts.push(`OrderBy=${filter.field}`);
          }
          break;
        case Operations.Limit:
          if (filter.value) {
            queryParts.push(`Limit=${filter.value}`);
          }
          break;
        // Handle other operations like Select, Exclude, etc.
      }
    }

    return `${baseUrl}?${queryParts.join("&")}`;
  };

  const buildWhereClause = (field: keyof Company, value: any): string => {
    return `Where=${field} like '${value}'`;
  };

  return { addFilter, removeFilter, buildQuery };
};