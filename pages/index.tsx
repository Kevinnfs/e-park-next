import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
// import TrendingProduct from "@/components/home/TrendingProduct";
// import { withCommonServerSideProps } from "@/hoc/withCommonServerSideProps";
import Api from "@/service/Api";
import { CarouselSlide } from "@/components/marketing/CarouseSlide";

// export const getServerSideProps = withCommonServerSideProps(async () => {
//   const api = new Api();
//   api.url = "slider/get";
//   const resp = await api.call();
//   const slider = resp.data;

//   return {
//     props: {
//       slider,
//     },
//   };
// });

const Index: NextPage = ({ categories, slider }: any) => (
  <Layout
    title="The Creative Kit - Koleksi terbaik baju muslim."
    categories={categories}
    showSearchBar={true}
  >
    <div className="flex flex-col gap-8 ">
      <CarouselSlide />
      {/* <TrendingProduct /> */}
    </div>
  </Layout>
);

export default Index;
