import { MutableRefObject, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const H = `h${headingLevel}` as any;
  const titleRef = useRef(null) as MutableRefObject<HTMLElement | null>;

  useEffect(() => {
    if (titleRef.current && location.state && location.state.focus) {
      titleRef.current.focus();
    }
    window.scrollTo(0, 0);
  }, [location.state]);

  return (
    <>
      {shouldUpdatePageTitle && (
        <Helmet>
          <title>{title} | Ultimate Ice Cream</title>
        </Helmet>
      )}
      <section>
        <H tabIndex={-1} ref={titleRef} className="main-heading">
          {title}
        </H>
        {children}
      </section>
    </>
  );
};

export default PageSection;
