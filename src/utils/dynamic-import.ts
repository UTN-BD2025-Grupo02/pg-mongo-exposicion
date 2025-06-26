export const dynamicImport = async (pkg: string) =>
  // ✅ Evita validación estática y permite importar ESM dentro de CJS
  new Function(`return import('${pkg}')`)();