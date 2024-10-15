import config from "@/configurations/config";
import { Company, defaultCompanyKeyArray } from "../models/api/company";
import { useState, useEffect } from "react";
import { Filter } from "../models/ui";
import { QueryFilterType } from "../models/api/query";

export const useQueryBuilder = (baseUrl: string) => {
  
  const baseQuery = config.apiUrl + config.endpoints.companies;
  const [limit, setLimit] = useState<number>(50);
  const [select, setSelect] = useState<Array<keyof Company>>(defaultCompanyKeyArray);
  const [exclude, setExclude] = useState<Filter[]>([]);
  const [where, setWhere] = useState<Filter[]>([]);
  const [query, setQuery] = useState<string>(baseQuery);
  
  const addSelect = (select: keyof Company) => {
    setSelect((prevSelect) => [...prevSelect, select]);
  };
  const removeSelect = (select: keyof Company) => { 
    setSelect(prevSelect => prevSelect.filter(s => s !== select));
  }; 
  const addWhere = (where: Filter) => { 
    setWhere((prevWhere) => [...prevWhere, where]);
  };

  const removeWhere = (whereId: number) => { 
    setWhere(prevWhere => prevWhere.filter(where => where.id !== whereId));
  };

  const addExclude = (excludeId: number) => { 
    setExclude(prevExclude => prevExclude.filter(exclude => exclude.id !== excludeId));
  };

  const removeExclude = (excludeId : number) => {
    setExclude(prevExclude => prevExclude.filter(exclude => exclude.id !== excludeId));
  };
  useEffect(() => {
    buildQuery()
  }, [limit, where, select, exclude]); 

  const buildQuery = () => {
    let queryParts: string[] = [];
    queryParts.push(buildClause(QueryFilterType.Limit, limit));
    queryParts.push(buildClause(QueryFilterType.Limit, limit));
    queryParts.push(buildSelectClause());
    queryParts.push(buildWhereClause());
    queryParts.push(buildExcludeClause());
    let query = `${baseUrl}?${queryParts.join("&")}`
    setQuery(query);
  };


  function buildSelectClause(): string
  {
    return select.reduce((queryString, key, index) => {
      const filterString = `${encodeURIComponent(key)}`;
      
      const prefix = index > 0 ? `,` : `${QueryFilterType.Select}=`;
      
      return queryString + prefix + filterString;
    }, '');
  }
  function buildWhereClause(): string {
    return where.reduce((queryString, filter, index) => {
      const filterString = `${filter.field} ${filter.operator} ${encodeURIComponent(filter.value)}`;
      
      // If it's not the first filter, include the operator link (AND/OR)
      const prefix = index > 0 ? ` ${filter.operatorLink} ` : `${QueryFilterType.Where}=`;
      
      return queryString + prefix + filterString;
    }, '');
  }
  const buildExcludeClause = () : string => {
    return exclude.reduce((queryString, filter, index) => {
      const filterString = `${filter.field} ${filter.operator} ${encodeURIComponent(filter.value)}`;
      
      const prefix = index > 0 ? ` ${filter.operatorLink} ` : `${QueryFilterType.Exclude}=`;
      
      return queryString + prefix + filterString;
    }, '');
  }
  const buildClause = (type : QueryFilterType, value : string | number) : string =>{
    return `${type} = ${value}`;
  }

  return { query, addWhere, removeWhere, addExclude, removeExclude, addSelect, removeSelect, limit, setLimit, buildQuery };
};