import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { AdventCalendarsAPI } from '$lib/api';
import type { AdventCalendarResponse } from '$lib/openapi';

export const load: PageServerLoad = async (event) => {
    const user = event.locals.user;

    if (!user) {
        throw error(401, {
            message: 'You must be logged in to view this page'
        });
    }
    // year年のadventcalendarのカレンダー一覧を取得
    const adventCalendars = await AdventCalendarsAPI.getAdventCalendarsByYearAdventCalendarsYearYearGet({ year: parseInt(event.params.year, 10) });
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
        // year年のadventcalendarのカレンダー一覧を取得
        const adventCalendars = await AdventCalendarsAPI.getAdventCalendarsByYearAdventCalendarsYearYearGet({ year: parseInt(event.params.year, 10) }) as AdventCalendarResponse[];        // カレンダーの重複チェック
        const title = formData.title as string;
        if (adventCalendars.some(adventCalendar => adventCalendar.title === title)) {
            throw error(400, {
                message: 'カレンダー名が重複しています'
            });
        }
        // カレンダーの登録
        await AdventCalendarsAPI.createAdventCalendarAdventCalendarsPost({
            adventCalendarCreate: {
                year: parseInt(event.params.year, 10),
                title: title,
                description: formData.description as string,
                authorId: user.id,
            }
        });
        // カレンダー一覧の取得
        const newAdventCalendars = await AdventCalendarsAPI.getAdventCalendarsByYearAdventCalendarsYearYearGet({ year: parseInt(event.params.year, 10) });
        return {
            year: event.params.year,
            user: user,
            adventCalendars: newAdventCalendars,
        };
    },
};
