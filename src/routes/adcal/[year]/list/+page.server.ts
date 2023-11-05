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
    // year年のadventcalendarのカテゴリー一覧を取得
    const adventCalendars = await db.adventCalendar.findMany({
        where: {
            year: parseInt(event.params.year, 10),
        },
        orderBy: { category: 'asc' }
    })
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
        const adventCalendars = await db.adventCalendar.findMany({
            where: {
                year: parseInt(event.params.year, 10),
            },
            orderBy: { category: 'asc' }
        })
        // カテゴリーの重複チェック
        const category = formData.category as string;
        if (adventCalendars.some(adventCalendar => adventCalendar.category === category)) {
            throw error(400, {
                message: 'カテゴリーが重複しています'
            });
        }
        // カテゴリーの登録
        await db.adventCalendar.create({
            data: {
                year: parseInt(event.params.year, 10),
                category: category,
                authorId: user.id,
            }
        });
        // カテゴリー一覧の取得
        const newAdventCalendars = await db.adventCalendar.findMany({
            where: {
                year: parseInt(event.params.year, 10),
            },
            orderBy: { category: 'asc' }
        })
        return {
            year: event.params.year,
            user: user,
            adventCalendars: newAdventCalendars,
        };
    },
};
