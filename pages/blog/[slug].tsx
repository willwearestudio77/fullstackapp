import Head from 'next/head'
import Image from 'next/image'
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import Markdown from 'marked-react';
import {GetStaticProps} from 'next'
import {
  Card,
  CardMedia, 
  CardContent
} from '@/components/mui/index'
import Paragraph from '@/components/Paragraph';
import { AllPosts,SinglePost  } from '@/lib/hygraph/queries';


interface HeroImage {
  url: string;
}
interface BlogPost {
  title: string;
  blogBody: string;
  heroImage: HeroImage | HeroImage[];
}

interface BlogPostProps {
  ssd: BlogPost;
}
interface Params {
  slug:string;
}
// const inter = Inter({ subsets: ['latin'] })

export default function BlogPost({ ssd }:BlogPostProps) {
  const {
    title,
    blogBody,
    heroImage
  } = ssd;
  const imageUrl = Array.isArray(heroImage) ? heroImage[0]?.url : heroImage?.url;
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Heading variant="h2" component="h2">Single Post</Heading>
        <Card component={"article"} sx={{ width: "100%" }}>
          <CardMedia sx={{ display: "grid", placeContent: "center" }}>
            <Image alt={title} src={imageUrl} width="200" height="200" style={{objectFit: "cover"}} />
          </CardMedia>
          <CardContent>
            <Heading variant='h2' component="h2">{title}</Heading>
            <Markdown>{blogBody}</Markdown>
          </CardContent>
        </Card>
      </Layout>
    </>
  );
}

export const getStaticPaths = async () => {
  const allPosts = await fetch(`${process.env.HYGRAPH_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: AllPosts,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res.data.blogs);
      return res.data.blogs;
    })
    .catch((err) => console.log(err));
  console.log('allPosts', allPosts);
  const paths = allPosts.map((post:any) => ({
    params: { slug: post.slug },
  }));

  return { paths, fallback: false };
};

export async function getStaticProps({ params }:{params:Params}) {
  console.log(params);
  const {blog:post} = await fetch(`${process.env.HYGRAPH_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
    },
    body: JSON.stringify({
      query: SinglePost,
      variables: { slug: params.slug },
    }),
  })
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return { props: { ssd: post } };
}