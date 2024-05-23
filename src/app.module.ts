import { AppRoutingModule } from './app.routing-module';
import { ConfigurationModule } from './infrastructure/configuration/configuration.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { TaskService } from './task/task.service';

@Module({
    imports: [AppRoutingModule, ConfigurationModule, DatabaseModule],
    providers: [UserService, TaskService],
})
export class AppModule {}
