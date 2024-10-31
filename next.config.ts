import path from 'path';
import { Configuration } from 'webpack';

const isMobile = process.env.MOBILE === 'true';

const nextConfig = {
  ...(isMobile ? { output: 'export' } : {}),
  sassOptions: {
    prependData: `@import "${path.resolve(__dirname, 'styles/application.scss')}";`,
  },
  webpack(config: Configuration) {
    config.infrastructureLogging = { level: 'error' };

    const rules = config.module.rules
      .find((rule: any) => typeof rule.oneOf === 'object')
      .oneOf.filter((rule: any) => Array.isArray(rule.use));

    rules.forEach((rule: { use: any[] }) => {
      rule.use.forEach((moduleLoader) => {
        if (
          moduleLoader.loader?.includes('css-loader') &&
          !moduleLoader.loader?.includes('postcss-loader')
        )
          if (moduleLoader.options.modules?.getLocalIdent) {
            moduleLoader.options.modules.getLocalIdent = (
              context: { rootContext: string; resourcePath: string },
              _: string,
              exportName: string
            ) => {
              const root = path.basename(path.dirname(context.resourcePath));

              const rootClass = root
                .replace(/^(.)/, (c) => c.toLowerCase())
                .replace(/([A-Z])/g, '-$1')
                .toLowerCase();

              return rootClass !== exportName ? `${rootClass}»${exportName}` : exportName;
            };
          }
      });
    });

    return config;
  },
};

module.exports = nextConfig;
