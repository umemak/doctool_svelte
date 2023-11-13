import { API_SERVER } from '$env/static/private';
import { DefaultApi, Configuration } from '$lib/openapi';

const conf = new Configuration({ basePath: API_SERVER });
const api = new DefaultApi(conf);

export { api }
