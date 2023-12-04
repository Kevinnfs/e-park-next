import React from "react"
import Layout from "@/components/layout/Layout";


export default function Profile({ categories, slider }: any) {


    return (
        <Layout 
        title="The Creative Kit - Koleksi terbaik baju muslim."
        categories={categories}
        showSearchBar={false}
        >

        <div className="text-black">profile</div></Layout>
    )
}