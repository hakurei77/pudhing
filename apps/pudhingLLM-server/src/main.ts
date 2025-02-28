import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(7422);
}
bootstrap().catch(err => {
    console.error(err);
});
