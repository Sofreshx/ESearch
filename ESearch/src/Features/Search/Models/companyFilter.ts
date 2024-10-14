import { CaMillesime } from "./caMillesime";

export interface CompanyFilter {
    nic?: string;
    forme_juridique?: string;
    code_ape?: string;
    code_postal?: number;
    ville?: string;
    departement?: string;
    region?: string;
    tranche_ca_millesime_1: CaMillesime
    tranche_ca_millesime_2: CaMillesime
    tranche_ca_millesime_3: CaMillesime

  }
export enum QueryOperator {
    Equal = "like",
    Less = "<",
    More = ">",
    Not = "not",
    Search = "search",
    Suggest = "suggest",
    StartsqWith = "startswith",
    InBbox = "in_bbox",
    WithinDistance = "within_distance",
    Intersects = "intersects",
    Disjoint = "disjoint",
    Within = "within"

}
export enum QueryOperatorLink{
  And = "and",
  Or = "or",
  Not = "not"
}
export enum QueryFilterType {
    Limit = "limit",
    Where = "where",
    Exclude = "exclude",
    Select = "select",
    OrderBy = "order_by",
    GroupBy = "group_by",
    IfNull = "ifnull"
}
  //TODO : move the string value of the parameters to a config file

  export function toCompanyQueryString(filter : CompanyFilter): string
  {
        const params = new URLSearchParams();
        if (filter.nic) params.append('nic', filter.nic);
        if (filter.forme_juridique) params.append('forme_juridique', filter.forme_juridique);
        if (filter.code_ape) params.append('code_ape', filter.code_ape);
        if (filter.code_postal) params.append('code_postal', filter.code_postal.toString());
        if (filter.ville) params.append('ville', filter.ville);
        if (filter.departement) params.append('departement', filter.departement);
        if (filter.region) params.append('region', filter.region);
        if (filter.tranche_ca_millesime_1) params.append('tranche_millesime_1', filter.tranche_ca_millesime_1)
        if (filter.tranche_ca_millesime_2) params.append('tranche_millesime_2', filter.tranche_ca_millesime_2)
        if (filter.tranche_ca_millesime_3) params.append('tranche_millesime_3', filter.tranche_ca_millesime_3)

        return params.toString();
  }