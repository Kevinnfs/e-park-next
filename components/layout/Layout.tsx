import { BlobOptions } from "buffer";
import Head from "next/head";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import NavbarComponent from "./NavbarComponent";
import { CategoryType } from "@/types/common";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keyword?: string;
  image?: string;
  type?: string;
  noVerificationAlert?: boolean;
  categories: CategoryType[];
  showSearchBar?: boolean;
}

function layout({
  children,
  title = "Website Title here",
  description = "Default description",
  keyword = "Default keyword",
  image = "/default-image.png",
  type = "website",
  noVerificationAlert = false,
  categories,
  showSearchBar = false,
}: LayoutProps) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keyword} />
        <meta property="og:type" content={type} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={`${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }${image}}`}
        />
        <meta
          property="og:url"
          content={`${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }${router.asPath}`}
        />
        <link rel="icon" href="icontck.png" type="image/png" key="favicon" />
      </Head>
      <main className="relative max-h-screen overflow-scroll bg-white">
        <ToastContainer
          draggablePercent={60}
          role="alert"
          position="top-center"
          toastClassName={(props: any) =>
            props.defaultClassName +
            " !font-base !shadow-lg !rounded-lg !text-gray-600 !bg-white"
          }
        />
        <NavbarComponent
          noVerificationAlert={noVerificationAlert}
          categories={categories}
          showSearchBar={showSearchBar}
        >
          <div className="">{children}</div>
        </NavbarComponent>
      </main>
    </>
  );
}

export default layout;
