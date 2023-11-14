/* tslint:disable */
/* eslint-disable */
/**
 * FastAPI
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  AdventCalendarArticleCreate,
  AdventCalendarArticleResponse,
  HTTPValidationError,
} from '../models/index';
import {
    AdventCalendarArticleCreateFromJSON,
    AdventCalendarArticleCreateToJSON,
    AdventCalendarArticleResponseFromJSON,
    AdventCalendarArticleResponseToJSON,
    HTTPValidationErrorFromJSON,
    HTTPValidationErrorToJSON,
} from '../models/index';

export interface CreateAdventCalendarArticleAdventCalendarArticlesPostRequest {
    adventCalendarArticleCreate: AdventCalendarArticleCreate;
}

export interface GetAdventCalendarArticleAdventCalendarArticlesIdGetRequest {
    id: string;
}

export interface GetAdventCalendarArticlesByAcAdventCalendarArticlesAcIdGetRequest {
    id: string;
}

export interface GetAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGetRequest {
    id: string;
    day: number;
}

/**
 * 
 */
export class AdventCalendarArticlesApi extends runtime.BaseAPI {

    /**
     * Create Advent Calendar Article
     */
    async createAdventCalendarArticleAdventCalendarArticlesPostRaw(requestParameters: CreateAdventCalendarArticleAdventCalendarArticlesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AdventCalendarArticleResponse>> {
        if (requestParameters.adventCalendarArticleCreate === null || requestParameters.adventCalendarArticleCreate === undefined) {
            throw new runtime.RequiredError('adventCalendarArticleCreate','Required parameter requestParameters.adventCalendarArticleCreate was null or undefined when calling createAdventCalendarArticleAdventCalendarArticlesPost.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/advent_calendar_articles`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AdventCalendarArticleCreateToJSON(requestParameters.adventCalendarArticleCreate),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AdventCalendarArticleResponseFromJSON(jsonValue));
    }

    /**
     * Create Advent Calendar Article
     */
    async createAdventCalendarArticleAdventCalendarArticlesPost(requestParameters: CreateAdventCalendarArticleAdventCalendarArticlesPostRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AdventCalendarArticleResponse> {
        const response = await this.createAdventCalendarArticleAdventCalendarArticlesPostRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Advent Calendar Article
     */
    async getAdventCalendarArticleAdventCalendarArticlesIdGetRaw(requestParameters: GetAdventCalendarArticleAdventCalendarArticlesIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AdventCalendarArticleResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getAdventCalendarArticleAdventCalendarArticlesIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/advent_calendar_articles/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AdventCalendarArticleResponseFromJSON(jsonValue));
    }

    /**
     * Get Advent Calendar Article
     */
    async getAdventCalendarArticleAdventCalendarArticlesIdGet(requestParameters: GetAdventCalendarArticleAdventCalendarArticlesIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AdventCalendarArticleResponse> {
        const response = await this.getAdventCalendarArticleAdventCalendarArticlesIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Advent Calendar Articles
     */
    async getAdventCalendarArticlesAdventCalendarArticlesGetRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AdventCalendarArticleResponse>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/advent_calendar_articles`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AdventCalendarArticleResponseFromJSON));
    }

    /**
     * Get Advent Calendar Articles
     */
    async getAdventCalendarArticlesAdventCalendarArticlesGet(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AdventCalendarArticleResponse>> {
        const response = await this.getAdventCalendarArticlesAdventCalendarArticlesGetRaw(initOverrides);
        return await response.value();
    }

    /**
     * Get Advent Calendar Articles By Ac
     */
    async getAdventCalendarArticlesByAcAdventCalendarArticlesAcIdGetRaw(requestParameters: GetAdventCalendarArticlesByAcAdventCalendarArticlesAcIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AdventCalendarArticleResponse>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getAdventCalendarArticlesByAcAdventCalendarArticlesAcIdGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/advent_calendar_articles/ac/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AdventCalendarArticleResponseFromJSON));
    }

    /**
     * Get Advent Calendar Articles By Ac
     */
    async getAdventCalendarArticlesByAcAdventCalendarArticlesAcIdGet(requestParameters: GetAdventCalendarArticlesByAcAdventCalendarArticlesAcIdGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AdventCalendarArticleResponse>> {
        const response = await this.getAdventCalendarArticlesByAcAdventCalendarArticlesAcIdGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     * Get Advent Calendar Articles By Ac And Day
     */
    async getAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGetRaw(requestParameters: GetAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<AdventCalendarArticleResponse>>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling getAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGet.');
        }

        if (requestParameters.day === null || requestParameters.day === undefined) {
            throw new runtime.RequiredError('day','Required parameter requestParameters.day was null or undefined when calling getAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGet.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/advent_calendar_articles/ac/{id}/{day}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))).replace(`{${"day"}}`, encodeURIComponent(String(requestParameters.day))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(AdventCalendarArticleResponseFromJSON));
    }

    /**
     * Get Advent Calendar Articles By Ac And Day
     */
    async getAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGet(requestParameters: GetAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGetRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<AdventCalendarArticleResponse>> {
        const response = await this.getAdventCalendarArticlesByAcAndDayAdventCalendarArticlesAcIdDayGetRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
