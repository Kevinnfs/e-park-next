import { NextPage } from "next";
import Layout from "@/components/layout/Layout";
import Api from "@/service/Api";
import { CarouselSlide } from "@/components/marketing/CarouseSlide";
import Picks from "@/components/marketing/Picks";
import { Profile } from "@/components/profile/Profile";
import { DefaultTable } from "@/components/profile/Table";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const Index: NextPage = ({ categories, slider }: any) => {
  const { data: session, status }: any = useSession();
  const [profile, setProfile] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = new Api();
        api.url = "/auth/profile";
        api.auth = true;
        api.token = session?.accessToken;
        const resp = await api.call();
        setProfile(resp.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session?.accessToken, profile]);
  // console.log(profile);

  return (
    <Layout
      title="The Creative Kit - Koleksi terbaik baju muslim."
      categories={categories}
      // showSearchBar={true}
    >
      <div className="flex flex-col gap-8">
        {/* <CarouselSlide /> */}
        {/* <Picks /> */}
        <Profile profile={profile} />
        {profile?.nocard && profile.nocard.length == !0 ? (
          <DefaultTable profile={profile} />
        ) : null}
      </div>
    </Layout>
  );
};

export default Index;
