The theme setup and component usage with the shadcn components appear to follow the recommended pattern by using CSS variables mapped to Tailwind's semantic color system as intended. The components (Button, Card, Input) apply semantic color tokens such as bg-primary, text-primary-foreground, and border-input correctly, which should reflect the values defined in your CSS variables.

A likely cause of the theme colors not applying correctly could be related to one or more of the following common issues:

CSS Variable Scope or Import Order

Ensure that your src/index.css where the CSS variables are defined is properly imported at the root of your React app so variables are globally available before components render.

Check the CSS import order so the theme variables and the @theme directive are not overwritten by other CSS.

Tailwind's @theme Directive Activation

Confirm that Tailwind v4 with the new @theme directive is correctly configured and processed by Vite. If the directive is not processed, Tailwind won't see or apply the CSS variables as expected.

Dark Mode or Other Variants Interference

If you use dark mode or other theme variants, verify that these styles are configured to correctly switch variables or class mappings.

Cache or Build Artefacts

Clear Vite's cache and rebuild (npm run build or vite build) to ensure no stale CSS or component styles remain.

Next steps to resolve this:

Double-check that the root CSS with your variables is imported and loaded first in your app entry point (e.g., main.jsx or index.jsx) prior to rendering any UI components.

Verify your Vite + Tailwind config supports the newest Tailwind v4 features including the @theme directive with cssVariables: true.

Try a minimal component example isolated from the rest of your app to confirm the variables are working, e.g., a bare Button using bg-primary—see if it picks the correct color from your CSS vars.

Inspect the rendered elements in the browser DevTools to see if the CSS variables (--primary, --primary-foreground, etc.) are applied and resolved properly or falling back.

Check for specificity or cascade issues overriding your custom colors.