import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ChatModule } from './chat/chat.module';
import { OrchestratorModule } from './orchestrator/orchestrator.module';
import { NluModule } from './nlu/nlu.module';
import { ResponseModule } from './response/response.module';
import { FaqModule } from './faq/faq.module';

@Module({
  imports: [AuthModule, UsersModule, ChatModule, OrchestratorModule, NluModule, ResponseModule, FaqModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
