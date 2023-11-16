import { API_SERVER } from '$env/static/private';
import { AdventCalendarArticlesApi, AdventCalendarsApi, ArticlesApi, LoginApi, ReviewsApi, UsersApi, SignupApi, Configuration } from '$lib/openapi';

const conf = new Configuration({ basePath: API_SERVER });
export const AdventCalendarArticlesAPI = new AdventCalendarArticlesApi(conf);
export const AdventCalendarsAPI = new AdventCalendarsApi(conf);
export const ArticlesAPI = new ArticlesApi(conf);
export const LoginAPI = new LoginApi(conf);
export const ReviewsAPI = new ReviewsApi(conf);
export const UsersAPI = new UsersApi(conf);
export const SignupAPI = new SignupApi(conf);

