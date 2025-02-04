const config = {
  arrowParens: 'always', // Pas de parenthèses pour les fonctions fléchées à paramètre unique
  bracketSameLine: false, // Fermer les balises JSX sur une nouvelle ligne
  bracketSpacing: true, // Espaces entre les accolades dans les objets
  htmlWhitespaceSensitivity: 'css', // Respecter les espaces selon les règles CSS
  insertPragma: false, // Pas de pragma inséré automatiquement
  jsxSingleQuote: false, // Utiliser des guillemets doubles dans le JSX
  plugins: ['prettier-plugin-tailwindcss'], // Plugin pour organiser les classes Tailwind
  printWidth: 80, // Longueur maximale d'une ligne avant un retour
  proseWrap: 'always', // Toujours couper les lignes en Markdown
  quoteProps: 'as-needed', // Ajouter des guillemets autour des clés d'objet si nécessaire
  requirePragma: false, // Pas besoin de pragma pour formater
  semi: true, // Terminer les instructions par un point-virgule
  singleQuote: true, // Utiliser des guillemets simples pour les chaînes
  tabWidth: 2, // Largeur d'indentation
  trailingComma: 'all', // Virgules finales pour des structures plus propres
  useTabs: false, // Utiliser des espaces au lieu des tabulations
};

export default config;
