import Api from "@/service/Api";

export const getCommonServerSideProps = async () => {
  const api = new Api();
  api.url = "categories/get";
  const resp = await api.call();
  const categories = resp.data;
  return {
    categories,
  };
};
