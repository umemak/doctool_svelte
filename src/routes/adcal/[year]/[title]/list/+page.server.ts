import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { AdventCalendarsAPI, AdventCalendarArticlesAPI, ArticlesAPI } from '$lib/api';

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;

    if (!user) {
        throw error(401, {
            message: 'You must be logged in to view this page'
        });
    }
    // year年のadventcalendarのカレンダーの記事一覧をarticleのdayの昇順で取得
    const adventCalendar = await AdventCalendarsAPI.getAdventCalendarsByYearAndTitleAdventCalendarsYearYearTitleGet({
        year: parseInt(event.params.year, 10),
        title: event.params.title,
    });
    if (!adventCalendar) {
        throw error(404, {
            message: 'Not found'
        });
    }
    const adventCalendarArticles = await AdventCalendarArticlesAPI.getAdventCalendarArticlesByAcAdventCalendarArticlesAcIdGet({
        id: adventCalendar[0].id,
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
        // year年のadventcalendarのカレンダーを取得
        const adventCalendar = await AdventCalendarsAPI.getAdventCalendarsByYearAndTitleAdventCalendarsYearYearTitleGet({
            year: parseInt(event.params.year, 10),
            title: event.params.title,
        });
        if (!adventCalendar) {
            throw error(404, {
                message: 'Not found'
            });
        }
        // articleのdayの重複チェック
        const day = parseInt(formData.day as string, 10);
        const adventCalendarArticle = await AdventCalendarArticlesAPI.getAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGet({
            id: adventCalendar[0].id,
            day: day,
        });
        if (adventCalendarArticle) {
            throw error(400, {
                message: 'その日付は既に登録されています'
            });
        }
        // adventCalendarArticleとarticleの登録
        const article = await ArticlesAPI.createArticleArticlesPost({
            articleCreate: {
                title: formData.title as string,
                description: "",
                path: "",
                filename: "",
                authorId: user.id,
                allowExternal: event.locals.external,
                showFrom: new Date(parseInt(event.params.year), 11, day, 0, 0, 0, 0),
                showUntil: null,
                reviewOk: false,
            }
        });
        await AdventCalendarArticlesAPI.createAdventCalendarArticleAdventCalendarArticlesPost({
            adventCalendarArticleCreate: {
                adventCalendarId: adventCalendar[0].id,
                articleId: article.id,
                day: day,
                title: formData.title as string,
                authorId: user.id,
            }
        });
    },
};
