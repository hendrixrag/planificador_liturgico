export enum LiturgicalSeason {
  // --- Tiempos Litúrgicos Principales ---
  ADVENT = 'Adviento',
  CHRISTMAS = 'Navidad',
  ORDINARY_TIME = 'Tiempo ordinario',
  LENT = 'Cuaresma',
  EASTER = 'Pascua',

  // --- Ciclo de Semana Santa y Triduo ---
  HOLY_WEEK = 'Semana Santa', // Incluye Domingo de Ramos
  EASTER_TRIDUUM = 'Triduo Pascual', // Jueves Santo, Viernes Santo, Vigilia

  // --- Solemnidades y Fiestas Específicas (Cambian el repertorio) ---
  EPIPHANY = 'Epifanía',
  BAPTISM_OF_THE_LORD = 'Bautismo del Señor',
  PENTECOST = 'Pentecostés',
  ASCENSION = 'Ascensión',
  TRINITY_SUNDAY = 'Santísima Trinidad',
  CORPUS_CHRISTI = 'Corpus Christi',
  CHRIST_THE_KING = 'Cristo Rey', // Cierre del año litúrgico

  // --- Otros ---
  MARIAN_FEAST = 'Fiesta Mariana', // Para cantos específicos de la Virgen
  SAINTS_FEAST = 'Fiesta de Santos',
  SPECIAL_CELEBRATION = 'Celebración Especial', // Matrimonios, Exequias, etc.
}

export const LITURGICAL_SEASONS = Object.values(LiturgicalSeason);
