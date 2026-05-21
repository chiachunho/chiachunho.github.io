// ESLint flat config (v9+)
// See: https://eslint.org/docs/latest/use/configure/configuration-files

const next = require('eslint-config-next/core-web-vitals');
const prettier = require('eslint-config-prettier/flat');

module.exports = [{ ignores: ['.next/**', 'out/**', 'node_modules/**'] }, ...next, prettier];
