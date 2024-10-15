import { QueryFilterType, QueryOperator, Company, QueryOperatorLink } from "../api";


export interface Filter { 
    id : number;
    filterType: QueryFilterType;
    field: keyof Company;
    operator: QueryOperator;
    value: any;
    operatorLink: QueryOperatorLink;
  }