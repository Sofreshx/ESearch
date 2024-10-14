import { Filter } from "lucide-react";
import { Company } from "../Models/company";
import { QueryFilterType, QueryOperator, QueryOperatorLink } from "../Models/companyFilter";
import { useState } from "react";

export interface Filter { //TODO : rework so it hold all of the data for a singe type ( where select etc) and need a custom type to hold both value field operator and operatorlink, filter holding an array of those
  filterType: QueryFilterType;
  operatorLink: QueryOperatorLink;
  operator: QueryOperator;
  field?: keyof Company;
  value?: any;
}

export const useQueryBuilder = (baseUrl: string) => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const addFilter = (filter: Filter) => {
    setFilters((prevFilters) => [...prevFilters, filter]);
  };

  const removeFilter = (operation: QueryFilterType, field?: keyof Company) => {
    setFilters((prevFilters) =>
      prevFilters.filter((f) => f.filterType !== operation || f.field !== field)
    );
  };

  const buildQuery = (): string => {
    let queryParts: string[] = [];
    let whereFilters = filters.filter(f => f.filterType == QueryFilterType.Where)

    if(whereFilters.length > 0){
      queryParts.push(buildWhereClause(whereFilters));
    }
    
    for (const filter of filters) {
      switch (filter.filterType) {
        case QueryFilterType.OrderBy:
          if (filter.field) {
            queryParts.push(`OrderBy=${filter.field}`);
          }
          break;
        case QueryFilterType.Limit:
          if (filter.value) {
            queryParts.push(`Limit=${filter.value}`);
          }
          break;
        // Handle other operations like Select, Exclude, etc.
      }
    }

    return `${baseUrl}?${queryParts.join("&")}`;
  };

  const buildWhereClause = (filters : Filter[]): string => {
    //start whereclause with where in the string :
    let clause = 
    //return `Where=${field} ${operator} "${value}"`;
  };

  return { addFilter, removeFilter, buildQuery };
};