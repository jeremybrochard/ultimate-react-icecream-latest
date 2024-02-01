import { Helmet } from 'react-helmet-async';

export interface PageSectionParams {
  title: string;
  headingLevel?: number;
  shouldUpdatePageTitle?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

const PageSection = ({
  title,
  headingLevel = 2,
  shouldUpdatePageTitle = true,
  children,
}: PageSectionParams) => {
  const H = `h${headingLevel}` as any;

  return (
    <>
      {shouldUpdatePageTitle && (
        <Helmet>
          <title>{title} | Ultimate Ice Cream</title>
        </Helmet>
      )}
      <section>
        <H className="main-heading">{title}</H>
        {children}
      </section>
    </>
  );
};

export default PageSection;
