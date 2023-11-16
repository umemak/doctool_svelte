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

import { exists, mapValues } from '../runtime';
import type { UserResponse } from './UserResponse';
import {
    UserResponseFromJSON,
    UserResponseFromJSONTyped,
    UserResponseToJSON,
} from './UserResponse';

/**
 * 
 * @export
 * @interface ArticleResponse
 */
export interface ArticleResponse {
    /**
     * 
     * @type {string}
     * @memberof ArticleResponse
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof ArticleResponse
     */
    title: string;
    /**
     * 
     * @type {string}
     * @memberof ArticleResponse
     */
    description: string;
    /**
     * 
     * @type {string}
     * @memberof ArticleResponse
     */
    authorId: string;
    /**
     * 
     * @type {UserResponse}
     * @memberof ArticleResponse
     */
    author: UserResponse;
    /**
     * 
     * @type {Date}
     * @memberof ArticleResponse
     */
    createdAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof ArticleResponse
     */
    updatedAt: Date;
    /**
     * 
     * @type {Date}
     * @memberof ArticleResponse
     */
    deletedAt: Date | null;
    /**
     * 
     * @type {string}
     * @memberof ArticleResponse
     */
    path: string;
    /**
     * 
     * @type {string}
     * @memberof ArticleResponse
     */
    filename: string;
    /**
     * 
     * @type {string}
     * @memberof ArticleResponse
     */
    filetype: string;
    /**
     * 
     * @type {number}
     * @memberof ArticleResponse
     */
    filesize: number;
    /**
     * 
     * @type {boolean}
     * @memberof ArticleResponse
     */
    allowExternal: boolean;
    /**
     * 
     * @type {Date}
     * @memberof ArticleResponse
     */
    showFrom: Date | null;
    /**
     * 
     * @type {Date}
     * @memberof ArticleResponse
     */
    showUntil: Date | null;
    /**
     * 
     * @type {boolean}
     * @memberof ArticleResponse
     */
    reviewOk: boolean;
    /**
     * 
     * @type {Array<string>}
     * @memberof ArticleResponse
     */
    tags: Array<string>;
    /**
     * 
     * @type {Array<any>}
     * @memberof ArticleResponse
     */
    comments: Array<any>;
    /**
     * 
     * @type {Array<any>}
     * @memberof ArticleResponse
     */
    likes: Array<any>;
    /**
     * 
     * @type {Array<any>}
     * @memberof ArticleResponse
     */
    reviews: Array<any>;
}

/**
 * Check if a given object implements the ArticleResponse interface.
 */
export function instanceOfArticleResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "id" in value;
    isInstance = isInstance && "title" in value;
    isInstance = isInstance && "description" in value;
    isInstance = isInstance && "authorId" in value;
    isInstance = isInstance && "author" in value;
    isInstance = isInstance && "createdAt" in value;
    isInstance = isInstance && "updatedAt" in value;
    isInstance = isInstance && "deletedAt" in value;
    isInstance = isInstance && "path" in value;
    isInstance = isInstance && "filename" in value;
    isInstance = isInstance && "filetype" in value;
    isInstance = isInstance && "filesize" in value;
    isInstance = isInstance && "allowExternal" in value;
    isInstance = isInstance && "showFrom" in value;
    isInstance = isInstance && "showUntil" in value;
    isInstance = isInstance && "reviewOk" in value;
    isInstance = isInstance && "tags" in value;
    isInstance = isInstance && "comments" in value;
    isInstance = isInstance && "likes" in value;
    isInstance = isInstance && "reviews" in value;

    return isInstance;
}

export function ArticleResponseFromJSON(json: any): ArticleResponse {
    return ArticleResponseFromJSONTyped(json, false);
}

export function ArticleResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ArticleResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'title': json['title'],
        'description': json['description'],
        'authorId': json['author_id'],
        'author': UserResponseFromJSON(json['author']),
        'createdAt': (new Date(json['created_at'])),
        'updatedAt': (new Date(json['updated_at'])),
        'deletedAt': (json['deleted_at'] === null ? null : new Date(json['deleted_at'])),
        'path': json['path'],
        'filename': json['filename'],
        'filetype': json['filetype'],
        'filesize': json['filesize'],
        'allowExternal': json['allow_external'],
        'showFrom': (json['show_from'] === null ? null : new Date(json['show_from'])),
        'showUntil': (json['show_until'] === null ? null : new Date(json['show_until'])),
        'reviewOk': json['review_ok'],
        'tags': json['tags'],
        'comments': json['comments'],
        'likes': json['likes'],
        'reviews': json['reviews'],
    };
}

export function ArticleResponseToJSON(value?: ArticleResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'title': value.title,
        'description': value.description,
        'author_id': value.authorId,
        'author': UserResponseToJSON(value.author),
        'created_at': (value.createdAt.toISOString()),
        'updated_at': (value.updatedAt.toISOString()),
        'deleted_at': (value.deletedAt === null ? null : value.deletedAt.toISOString()),
        'path': value.path,
        'filename': value.filename,
        'filetype': value.filetype,
        'filesize': value.filesize,
        'allow_external': value.allowExternal,
        'show_from': (value.showFrom === null ? null : value.showFrom.toISOString()),
        'show_until': (value.showUntil === null ? null : value.showUntil.toISOString()),
        'review_ok': value.reviewOk,
        'tags': value.tags,
        'comments': value.comments,
        'likes': value.likes,
        'reviews': value.reviews,
    };
}

