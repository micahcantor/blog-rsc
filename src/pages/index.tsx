import type { PageProps } from '@parcel/rsc';
import { Nav } from '../components/Nav';
import '../client';
import Base from '../components/Base';
import ThemeSwitcher from '../components/ThemeSwitcher';

export default function Index({pages, currentPage}: PageProps) {
  return (
    <Base
      title="Micah Cantor"
      description="Micah Cantor's personal website and blog"
    >
      <h1>Parcel Static React App</h1>
      <p>This page is a React Server Component that is statically rendered at build time. Edit <code>pages/index.tsx</code> to get started.</p>
      <p>Here is a client component: <ThemeSwitcher /></p>
      <Nav pages={pages} currentPage={currentPage} />
    </Base>
  );
}
