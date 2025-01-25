import { Module } from '@nestjs/common';
import { CommsModule } from 'src/comms/comms.module';

@Module({
  imports: [CommsModule],
})
export class AppModule {}
