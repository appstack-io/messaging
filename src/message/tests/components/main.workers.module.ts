import { Module } from '@nestjs/common';
import { MessageWorkerModule } from '../../workers/messageWorker.module';
import { WorkersModule } from '@appstack-io/workers';

const imports = [WorkersModule, MessageWorkerModule];

export { imports };

@Module({
  imports,
})
export class MainWorkersModule {
  static __filename = __filename;
}
