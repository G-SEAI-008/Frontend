import Hello from '~/components/Hello';

import type { Route } from './+types/hello';

function meta(_args: Route.MetaArgs) {
  return [
    { title: 'react router v8' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

// loader() ⇒ Daten laden (läuft, bevor die Komponente gerendert wird)
// action() ⇒ Formulare verarbeiten und Daten effizienter senden
// ErrorBoundary() ⇒ Feleransicht speziell für diese Route

const hello = () => {
  return <Hello />;
};

export default hello;
export { meta };
