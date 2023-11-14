import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { api } from '$lib/api';

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;

    if (!user) {
        throw error(401, {
            message: 'You must be logged in to view this page'
        });
    }
    // year年のadventcalendarのカテゴリーの記事一覧をarticleのdayの昇順で取得
    const adventCalendar = await api.getAdventCalendarsByYearAndNameAdventCalendarsYearYearNameGet({
        year: parseInt(event.params.year, 10),
        name: event.params.category,
    });
    if (!adventCalendar) {
        throw error(404, {
            message: 'Not found'
        });
    }
    const adventCalendarArticles = await api.getAdventCalendarArticlesByAdventCalendarIdAdventCalendarArticlesAdventCalendarIdAdventCalendarIdGet({ 
        adventCalendarId: adventCalendar.id,
    });
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
        const adventCalendar = await api.getAdventCalendarsByYearAndNameAdventCalendarsYearYearNameGet({
            year: parseInt(event.params.year, 10),
            name: event.params.category,
        });
            if (!adventCalendar) {
            throw error(404, {
                message: 'Not found'
            });
        }
        // articleのdayの重複チェック
        const day = parseInt(formData.day as string, 10);
        const adventCalendarArticle = await api.getAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGet({
            adventCalendarId: adventCalendar.id,
            day: day,
        });
        if (adventCalendarArticle) {
            throw error(400, {
                message: 'その日付は既に登録されています'
            });
        }
        // adventCalendarArticleとarticleの登録
        const article = await api.createArticleArticlesPost({articleCreate: {
            title: formData.title as string,
            description: "",
            path: "",
            authorId: user.id,
            allowExternal: event.locals.external,
            showFrom: new Date(parseInt(event.params.year), 11, day, 0, 0, 0, 0),
            showUntil: null,
        }});
        await api.createAdventCalendarArticleAdventCalendarArticlesPost({
            adventCalendarArticleCreate: {
                adventCalendarId: adventCalendar.id,
                articleId: article.id,
                day: day,
                title: formData.title as string,
                authorId: user.id,
            }
        });
    },
};
