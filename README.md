# Strapi example

This example deploys self-hosted version of [Strapi](https://strapi.io/). Internally it uses a PostgreSQL database to store the data.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/strapi?referralCode=milo)

## ✨ Features

- Strapi
- Postgres
- Cloudflare Images for image optimization and delivery
- Cloudflare R2 for PDFs and other media storage

## 💁‍♀️ How to use

- Click the Railway button 👆
- Add the environment variables
- Configure Cloudflare Images + R2 for media storage (see [HYBRID_SETUP.md](HYBRID_SETUP.md))
- Images will automatically be optimized via Cloudflare Images
- Other files (PDFs, docs) will be stored in Cloudflare R2

## 💻 Developing locally

When developing locally this Strapi template will connect to the Postgres server from its public [TCP Proxy](https://docs.railway.app/deploy/exposing-your-app#tcp-proxying)

- Enable the feature flag `Template Service Eject` in the [Feature Flags](https://railway.app/account/feature-flags) menu
- Within the service settings of the Strapi service click the `Eject` button on the upstream repository
- Clone that newly created repository locally
- Install Strapi's dependencies with `yarn install` or `npm install`
- Install the Railway CLI
    - Instructions for that can be found [here](https://docs.railway.app/develop/cli#installation)
    - If this is your first time using the CLI make sure to login with `railway login`
- Within the local repository run `railway link` to link the local repository to the Strapi service on Railway
- Start Strapi for development with `railway run yarn run develop` or `railway run npm run develop`
    - This command will run Strapi in development mode with the service variables available locally
- Open your browser to `http://127.0.0.1:1337/admin`

## 📝 Notes

- After your app is deployed, visit the `/admin` endpoint to create your admin user.
- If you want to use npm with this project make sure you delete the `yarn.lock` file after you have ran `npm install`
- **Media Storage**: This project uses a hybrid approach:
  - **Images**: Cloudflare Images (automatic optimization, CDN delivery)
  - **Other files**: Cloudflare R2 (PDFs, documents, etc.)
  - See [HYBRID_SETUP.md](HYBRID_SETUP.md) for setup instructions
