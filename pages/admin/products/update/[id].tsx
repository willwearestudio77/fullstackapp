import Head from 'next/head'
// import { useContext } from 'react';
// import { UIContext } from '@/components/contexts/UIContext';
// import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import { Button, EditIcon } from '@/components/mui/index';
import { QueryBoundaries } from '@/components/QueryBoundary';
import ProductList from '@/components/ProductList';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { fetchProducts } from "@/lib/api-functions/server/products/queries";
import { STORAGE_KEY } from "@/lib/tq/products/settings";
import ProductForm from '@/components/forms/ProductForm';
import { useUpdate } from '@/lib/tq/products/mutations';



const inter = Inter({ subsets: ['latin'] })

export default function UpdateProduct({ssd}) {
    
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Heading variant="h2" component="h2" >Update Product</Heading>
                <ProductForm product={ssd} submitHandler={useUpdate}/>
            </Layout>

        </>
    )
}
export async function getServerSideProps() {
    const product = await fetchProduct(id).catch((err) => console.log(err));
    console.log("product", product);
    return { props: { ssd: JSON.parse(JSON.stringify(product)) } };
}