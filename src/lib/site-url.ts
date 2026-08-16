function readEnv(name: string): string {
  const fromImportMeta =
    typeof import.meta !== 'undefined' && import.meta.env
      ? String(import.meta.env[name] ?? '').trim()
      : '';
  if (fromImportMeta) return fromImportMeta;

  if (typeof process !== 'undefined' && process.env?.[name]) {
    return String(process.env[name]).trim();
  }

  return '';
}

function isLocalhost(url: string): boolean {
  return /localhost|127\.0\.0\.1/.test(url);
}

function withHttps(hostOrUrl: string): string {
  return /^https?:\/\//i.test(hostOrUrl) ? hostOrUrl : `https://${hostOrUrl}`;
}

export function resolveSiteUrl(): string {
  const explicit = readEnv('PUBLIC_SITE_URL');
  if (explicit && !isLocalhost(explicit)) {
    return explicit.replace(/\/$/, '');
  }

  const vercelProduction = readEnv('VERCEL_PROJECT_PRODUCTION_URL');
  if (vercelProduction) {
    return withHttps(vercelProduction).replace(/\/$/, '');
  }

  const vercelDeployment = readEnv('VERCEL_URL');
  if (vercelDeployment) {
    return withHttps(vercelDeployment).replace(/\/$/, '');
  }

  return (explicit || 'http://localhost:4321').replace(/\/$/, '');
}
