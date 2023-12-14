import { Module } from '@nestjs/common';
import { IdentityServicesModule } from '@appstack-io/identity';

const imports = [IdentityServicesModule];

export { imports };

@Module({
  imports,
})
export class MainHttpModule {
  static __filename = __filename;
}
