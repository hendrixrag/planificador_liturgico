export enum LiturgicalCategory {
  ENTRY = 'Entrada',
  PENITENTIAL_ACT = 'Acto penitencial / Piedad',
  GLORIA = 'Gloria',
  PSALM = 'Salmo responsorial',
  GOSPEL_ACCLAMATION = 'Aclamación al Evangelio / Interleccional',
  OFFERTORY = 'Ofertorio',
  HOLY = 'Santo',
  MEMORIAL_ACCLAMATION = 'Aclamación memorial',
  LAMB_OF_GOD = 'Cordero de Dios',
  COMMUNION = 'Comunión',
  RECESSIONAL = 'Salida',
}

export const LITURGICAL_CATEGORIES = Object.values(LiturgicalCategory);
