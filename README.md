# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## 参考ページ

- [SvelteKitをローカルのDocker環境で動かすまで #Docker - Qiita](https://qiita.com/mkin/items/5b4fb2e61cf47fc5f904)
- [SvelteKit の JWT を使用した認証と認可の処理 - Okupter](https://www.okupter.com/blog/handling-auth-with-jwt-in-sveltekit)
- [amazon web services - Read and write from S3 within SvelteKit using AWS SDK v3 - Stack Overflow](https://stackoverflow.com/questions/76903243/read-and-write-from-s3-within-sveltekit-using-aws-sdk-v3)
- [yarbsemaj/sveltekit-adapter-lambda: An adapter to build a SvelteKit app into a lambda ready for deployment with lambda proxy via the Serverless Framework.](https://github.com/yarbsemaj/sveltekit-adapter-lambda)
