import styles from './Brand.module.scss';
import logo from './cocinista.png';

/* eslint-disable-next-line */
export interface BrandProps {
  title: string;
}

export function Brand({ title }: BrandProps) {
  return (
    <a
      className="flex items-center text-2xl font-bold uppercase text-black no-underline hover:no-underline lg:text-4xl"
      href="/"
      data-testid="brand"
    >
      <img
        src={logo}
        alt="Cocinista Logo"
        className="mr-4 h-8 w-8"
        data-testid="logo"
      />
      <p data-testid="title">{title}</p>
    </a>
  );
}

export default Brand;
