import { redirect } from '@sveltejs/kit'

export const GET = async ({ cookies }) => {
    cookies.delete('AuthorizationToken');
    throw redirect(302, '/login');
};
