import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import {Button,EditIcon} from '@/components/mui/index';
import Layout from '@/components/Layout';
import Heading from '@/components/Heading';
import Paragraph from '@/components/Paragraph';
import ContactForm from '@/components/forms/ContactForm';
import { sendMail } from '@/lib/api-functions/client';

// const inter = Inter({ subsets: ['latin'] })

export default function Contact() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Heading component="h2" >Contact</Heading>
        <Paragraph>
          Use the form below to get in touch
        </Paragraph>
       
        <ContactForm submitHandler={sendMail}/>
        </Layout>
      
    </>
  )
}