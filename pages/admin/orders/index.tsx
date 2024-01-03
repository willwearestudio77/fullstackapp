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
import { useDelete } from '@/lib/tq/products/mutations';



const inter = Inter({ subsets: ['latin'] })

export default function AdminProductList() {
    const removeMutation = useDelete();
    const removeHandler = (id) => {
        removeMutation.mutate(id);
      };
    
    return (
        <>
            <Head>
                <title>Orders</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Layout>
                <Heading variant="h2" component="h2" >Orders</Heading>
                <Button variant="contained"
            component={Link}
            href={`/admin/orders/add`}>Add Product</Button>
                <QueryBoundaries>
                    <ProductList deleteHandler={removeHandler} />
                </QueryBoundaries>
            </Layout>

        </>
    )
}
export async function getStaticProps(context:any) {
    // console.log("LLLL", context);
    const products = await fetchProducts().catch((err) => console.log(err));
    const queryClient = new QueryClient();


    // If this was remote we'd use 'prefetchQuery' but as we know it we use 'setQueryData'
    await queryClient.setQueryData(
        [STORAGE_KEY],
        JSON.parse(JSON.stringify(products))
    );

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    };
}