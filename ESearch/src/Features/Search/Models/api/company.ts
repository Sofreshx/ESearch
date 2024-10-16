export interface Company {
    denomination: string
    siren: string
    nic: string
    forme_juridique: string
    code_ape?: string
    libelle_ape?: string
    adresse: string
    code_postal: number
    ville: string
    num_dept: number
    departement: string
    region: string
    code_greffe: number
    greffe: string
    date_immatriculation: string
    date_radiation: any
    statut: string
    geolocalisation?: string
    date_de_publication: string
    millesime_1: string
    date_de_cloture_exercice_1: string
    duree_1: number
    ca_1?: string
    resultat_1: string
    effectif_1?: string
    millesime_2?: string
    date_de_cloture_exercice_2?: string
    duree_2?: number
    ca_2?: string
    resultat_2?: string
    effectif_2?: string
    millesime_3: string
    date_de_cloture_exercice_3: string
    duree_3: number
    ca_3?: string
    resultat_3: string
    effectif_3?: string
    id: any
    tranche_ca_millesime_1: string
    tranche_ca_millesime_2: string
    tranche_ca_millesime_3: string
  }

  export const defaultCompanyKeyArray = Object.keys(<Company>{}) as Array<keyof Company>