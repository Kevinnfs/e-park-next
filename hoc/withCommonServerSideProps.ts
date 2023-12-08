import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { getCommonServerSideProps } from "../helpers/sharedServerSideProps";

type PageServerSidePropsFunc = (
  ctx: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<any>>;

export const withCommonServerSideProps =
  (getPageServerSideProps?: PageServerSidePropsFunc) =>
  async (ctx: GetServerSidePropsContext) => {
    // Get common server-side props
    const commonProps: any = await getCommonServerSideProps();
    // If common props indicate not found, immediately return
    if (commonProps?.notFound) {
      return {
        notFound: true,
      };
    }

    // If there's no specific page server-side props function, return common props
    if (!getPageServerSideProps) {
      return {
        props: commonProps,
      };
    }

    // Get specific page server-side props if defined
    const pageProps: any = await getPageServerSideProps(ctx);
    // If page props indicate not found, immediately return
    if (pageProps?.notFound) {
      return {
        notFound: true,
      };
    }

    if (pageProps?.redirect) {
      return {
        redirect: pageProps?.redirect,
      };
    }

    // Merge the props, but let pageProps take priority (so spread commonProps first)
    return {
      props: {
        ...commonProps,
        ...pageProps.props,
      },
    };
  };
