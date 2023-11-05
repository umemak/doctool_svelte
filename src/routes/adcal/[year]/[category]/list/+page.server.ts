import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { db } from '$lib/db';

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;

    if (!user) {
        throw error(401, {
            message: 'You must be logged in to view this page'
        });
    }
    // year年のadventcalendarのカテゴリーの記事一覧をarticleのdayの昇順で取得
    const adventCalendar = await db.adventCalendar.findFirst({
        where: {
            year: parseInt(event.params.year, 10),
            category: event.params.category,
        }
    })
    if (!adventCalendar) {
        throw error(404, {
            message: 'Not found'
        });
    }
    const adventCalendarArticles = await db.adventCalendarArticle.findMany({
        where: {
            adventCalendarId: adventCalendar.id,
        },
        include: {
            author: true,
        },
        orderBy: { day: 'asc' }
    })
    return {
        year: event.params.year,
        user: user,
        adventCalendar: adventCalendar,
        adventCalendarArticles: adventCalendarArticles,
    };
};

export const actions: Actions = {
    entry: async (event) => {
        const user = event.locals.user;
        if (!user) {
            throw error(401, {
                message: 'You must be logged in to view this page'
            });
        }
        const formData = Object.fromEntries(await event.request.formData());
        // year年のadventcalendarのカテゴリーを取得
        const adventCalendar = await db.adventCalendar.findFirst({
            where: {
                year: parseInt(event.params.year, 10),
                category: event.params.category,
            }
        })
        if (!adventCalendar) {
            throw error(404, {
                message: 'Not found'
            });
        }
        // articleのdayの重複チェック
        const day = parseInt(formData.day as string, 10);
        const adventCalendarArticle = await db.adventCalendarArticle.findFirst({
            where: {
                adventCalendarId: adventCalendar.id,
                day: day,
            }
        })
        if (adventCalendarArticle) {
            throw error(400, {
                message: 'その日付は既に登録されています'
            });
        }
        // adventCalendarArticleとarticleの登録
        const article = await db.article.create({
            data: {
                title: formData.title as string,
                description: "",
                path: "",
                authorId: user.id,
                allow_external: event.locals.external,
                show_from: new Date(parseInt(event.params.year), 11, day, 0, 0, 0, 0),
                show_until: null,
            }
        });
        await db.adventCalendarArticle.create({
            data: {
                adventCalendarId: adventCalendar.id,
                articleId: article.id,
                day: day,
                title: formData.title as string,
                authorId: user.id,
            }
        });
    },
};
