import { protoBuild } from '@appstack-io/proto';

(async () => {
  await protoBuild({
    projectDir: `${__dirname}`,
    protoDir: `src`,
    exclude: ['/tests/', 'combined'],
    combinedName: 'combined',
    clientDir: 'client',
  });
})();
