import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { api } from '$lib/api';
import type { AdventCalendarResponse } from '$lib/openapi';

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;

    if (!user) {
        throw error(401, {
            message: 'You must be logged in to view this page'
        });
    }
    // year年のadventcalendarのカテゴリー一覧を取得
    const adventCalendars = await api.getAdventCalendarsByYearAdventCalendarsYearYearGet({ year: parseInt(event.params.year, 10) });
    return {
        year: event.params.year,
        user: user,
        adventCalendars: adventCalendars,
    };
};

export const actions: Actions = {
    create: async (event) => {
        const user = event.locals.user;
        if (!user) {
            throw error(401, {
                message: 'You must be logged in to view this page'
            });
        }
        const formData = Object.fromEntries(await event.request.formData());
        // year年のadventcalendarのカテゴリー一覧を取得
        const adventCalendars = await api.getAdventCalendarsByYearAdventCalendarsYearYearGet({ year: parseInt(event.params.year, 10) }) as AdventCalendarResponse[];        // カテゴリーの重複チェック
        const category = formData.category as string;
        if (adventCalendars.some(adventCalendar => adventCalendar.title === category)) {
            throw error(400, {
                message: 'カテゴリーが重複しています'
            });
        }
        // カテゴリーの登録
        await api.postAdventCalendarsAdventCalendarsPost({
            adventCalendar: {
                year: parseInt(event.params.year, 10),
                name: category,
                authorId: user.id,
            }
        });
        // カテゴリー一覧の取得
        const newAdventCalendars = await api.getAdventCalendarsByYearAdventCalendarsYearYearGet({ year: parseInt(event.params.year, 10) });
        return {
            year: event.params.year,
            user: user,
            adventCalendars: newAdventCalendars,
        };
    },
};
