import { Company } from "../models/company";
import { QueryFilterType, QueryOperator, QueryOperatorLink } from "../models/companyFilter";
import { useState } from "react";

export interface Filter { 
  filterType: QueryFilterType;
  filterElements: FilterElement[];
}

export interface FilterElement{ //TODO : filter will actually only be for the where clause ( exclude maybe )
  field: keyof Company;
  operator: QueryOperator;
  value: any;
  operatorLink: QueryOperatorLink;
}

export const useQueryBuilder = (baseUrl: string) => {
  const [limit, setLimit] = useState<number>(0);
  const [orderBy, setOrderBy] = useState<string>("");
  const [select, setSelect] = useState<string[]>([]);
  const [exclude, setExclude] = useState<Filter[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [query, setQuery] = useState<string>("");
  

  const addFilter = (filter: Filter) => { //TODO we need to avoid duplicate filters
    setFilters((prevFilters) => [...prevFilters, filter]);
  };

  const removeFilter = (operation: QueryFilterType, field?: keyof Company) => { //TODO this is not correct
    setFilters((prevFilters) =>
      prevFilters.filter((filter) => filter.filterType !== operation || filter.filterElements[0].field !== field)
    );
  };

  const buildQuery = (): string => {
    let queryParts: string[] = [];
    
    //TODO : add other query values like select, limit etc directly as they are much simpler
    for (const filter of filters) {
      switch (filter.filterType) {
        case QueryFilterType.Where:
          queryParts.push(buildClause(filter));
          break;
        case QueryFilterType.OrderBy:
          queryParts.push(buildClause(filter));
          break;
        case QueryFilterType.Limit:
          queryParts.push(buildClause(filter));
          break;
        // Handle other operations like Select, Exclude, etc.
      }
    }

    return `${baseUrl}?${queryParts.join("&")}`;
  };

  const buildClause = (filter : Filter): string => {
    if(filter.filterElements.length === 0) return "";

    let whereClause = `${filter.filterType}=
    ${filter.filterElements[0].field} ${filter.filterElements[0].operator} ${filter.filterElements[0].value} `;

    if(filter.filterElements.length === 1) return whereClause;

    for (let i = 1; i < filter.filterElements.length; i++) {
      whereClause += ` ${filter.filterElements[i].operatorLink} ${filter.filterElements[i].field} ${filter.filterElements[i].operator} "${filter.filterElements[i].value}"`;
    }
    return whereClause;
  };

  return { addFilter, removeFilter, buildQuery };
};