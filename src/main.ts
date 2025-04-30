  import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from './app.module';
import  { renderFile } from "ejs";
import { join } from "path";
import { ValidationPipe } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

async function bootstrap() {

  const app
      = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setBaseViewsDir(join(__dirname, "..", "view"));
  app.setViewEngine("ejs");
  app.engine("html", renderFile);
  app.useStaticAssets(join(__dirname, "..", "public"));
  app.useGlobalPipes(new ValidationPipe());

  app.use("/main", (
    req: Request,
    res: Response,
    next: NextFunction
  ) => res.render("index.html"));

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
