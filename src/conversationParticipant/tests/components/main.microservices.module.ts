import { Module } from '@nestjs/common';
import { PermissionModule } from '@appstack-io/permissions';
import { IdentityServicesModule } from '@appstack-io/identity';
import { MessagingServicesModule } from '../../../messaging.services.module';

const imports = [
  PermissionModule,
  IdentityServicesModule,
  MessagingServicesModule,
];

export { imports };

@Module({
  imports,
})
export class MainMicroservicesModule {
  static __filename = __filename;
}
