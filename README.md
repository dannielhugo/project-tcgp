This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Set Up Env

Make a copy of env-default and rename it to .env.local

## Set Up Database

* Create a primsa dabatase and account

```bash
$ npx prisma init --db --output ../app/generated/prisma
```

* Go to https://console.prisma.io/, log in to your account.

* Select "Connect to Database" and click on "Configure your database access"

* Copy the generated URL string and put it on your .env file

* Finally create the tables using:

```bash
$ npx prisma migrate dev --name init
```

## Open prisma studio (Visual Database)

```bash
$ npx prisma studio
```

## Using prisma

https://www.prisma.io/docs/guides/nextjs#3-query-your-database-with-prisma-orm

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Primsa + Vercel: https://www.prisma.io/docs/guides/nextjs#7-deploy-your-application-to-vercel-optional