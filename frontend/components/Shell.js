import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import ChainHeader from './ChainHeader';
import ChainFooter from './ChainFooter';

// Consumer chrome wrapper
export function SiteShell({ children, footer = true }) {
  return (
    <>
      <SiteHeader />
      {children}
      {footer && <SiteFooter />}
    </>
  );
}

// SacredChain (indigo) chrome wrapper
export function ChainShell({ children }) {
  return (
    <>
      <ChainHeader />
      {children}
      <ChainFooter />
    </>
  );
}
