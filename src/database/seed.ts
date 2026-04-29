import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { SongsService } from '../songs/songs.service';
import { LiturgicalCategory } from '../common/constants/liturgical-categories.constant';
import { LiturgicalSeason } from '../common/constants/liturgical-seasons.constant';

async function bootstrap() {
  // Creamos el contexto de la aplicación, pero sin escuchar en ningún puerto (solo para acceder a los servicios)
  const app = await NestFactory.createApplicationContext(AppModule);

  // Obtenemos la instancia del servicio de canciones
  const songsService = app.get(SongsService);

  const testSongs = [
    {
      title: 'Ven Espíritu Santo',
      lyrics: 'Ven, Espíritu Santo, llega hoy a nuestras almas...',
      key: 'G' as const,
      category: [LiturgicalCategory.ENTRY],
      liturgicalSeason: [
        LiturgicalSeason.PENTECOST,
        LiturgicalSeason.ORDINARY_TIME,
      ],
      bpm: 80,
    },
    {
      title: 'Señor ten piedad',
      lyrics: 'Señor, ten piedad de nosotros, Cristo ten piedad...',
      key: 'Am' as const,
      category: [LiturgicalCategory.PENITENTIAL_ACT],
      liturgicalSeason: [LiturgicalSeason.ORDINARY_TIME, LiturgicalSeason.LENT],
      bpm: 65,
    },
    {
      title: 'Gloria a Dios en el cielo',
      lyrics: 'Gloria a Dios en el cielo y en la tierra paz a los hombres...',
      key: 'C' as const,
      category: [LiturgicalCategory.GLORIA],
      liturgicalSeason: [
        LiturgicalSeason.ORDINARY_TIME,
        LiturgicalSeason.EASTER,
      ],
      bpm: 110,
    },
    {
      title: 'El Señor es mi pastor',
      lyrics: 'El Señor es mi pastor, nada me falta...',
      key: 'D' as const,
      category: [LiturgicalCategory.PSALM],
      liturgicalSeason: [LiturgicalSeason.ORDINARY_TIME],
      bpm: 70,
    },
    {
      title: 'Aleluya',
      lyrics: 'Aleluya, aleluya. El Señor resucitó...',
      key: 'E' as const,
      category: [LiturgicalCategory.GOSPEL_ACCLAMATION],
      liturgicalSeason: [
        LiturgicalSeason.ORDINARY_TIME,
        LiturgicalSeason.EASTER,
      ],
      bpm: 95,
    },
    {
      title: 'Te ofrecemos Señor',
      lyrics: 'Te ofrecemos Señor, este pan y este vino...',
      key: 'F' as const,
      category: [LiturgicalCategory.OFFERTORY],
      liturgicalSeason: [LiturgicalSeason.ORDINARY_TIME],
      bpm: 75,
    },
    {
      title: 'Santo es el Señor',
      lyrics: 'Santo, Santo, Santo es el Señor, Dios del universo...',
      key: 'A' as const,
      category: [LiturgicalCategory.HOLY],
      liturgicalSeason: [
        LiturgicalSeason.ORDINARY_TIME,
        LiturgicalSeason.ADVENT,
      ],
      bpm: 90,
    },
    {
      title: 'Cordero de Dios',
      lyrics: 'Cordero de Dios, que quitas el pecado del mundo...',
      key: 'Em' as const,
      category: [LiturgicalCategory.LAMB_OF_GOD],
      liturgicalSeason: [LiturgicalSeason.ORDINARY_TIME],
      bpm: 60,
    },
    {
      title: 'Pan de Vida',
      lyrics: 'Yo soy el pan de vida, el que viene a mí no tendrá hambre...',
      key: 'Bb' as const,
      category: [LiturgicalCategory.COMMUNION],
      liturgicalSeason: [
        LiturgicalSeason.ORDINARY_TIME,
        LiturgicalSeason.EASTER,
      ],
      bpm: 70,
    },
    {
      title: 'Junto a ti María',
      lyrics: 'Junto a ti María. como un niño quiero estar...',
      key: 'D' as const,
      category: [LiturgicalCategory.RECESSIONAL],
      liturgicalSeason: [
        LiturgicalSeason.MARIAN_FEAST,
        LiturgicalSeason.ORDINARY_TIME,
      ],
      bpm: 85,
    },
  ];

  console.log('🌱 Iniciando la carga de datos (Seeding)...');

  // Insertar cada canción utilizando el servicio
  for (const song of testSongs) {
    await songsService.create(song);
    console.log(`✅ Canción insertada: ${song.title}`);
  }

  console.log('🚀 Carga de datos finalizada correctamente');

  // Cerramos la aplicación
  await app.close();
}

bootstrap().catch((error) => {
  console.error('❌ Error ejecutando el seed:', error);
  process.exit(1);
});
