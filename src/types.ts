export type Config = {
    servers: Array<string>,
    tags: Array<string>,
    accounts: Array<string>,

    loadPublic: boolean,
    loadFederated: boolean,
    loadTrends: boolean,

    languages: Array<string>,
    badWords: Array<string>,
    hideSensitive: boolean,
    hideBoosts: boolean,
    hideReplies: boolean,
    hideBots: boolean,

    limit: number,
    interval: number,

    title: string,
    theme: string,
    showInfobar: boolean,

    showText: boolean,
    showMedia: boolean,
    playVideos: boolean,
}

export type Post = {
    id: string;
    url: string;
    content: string;
    date: Date;

    author?: {
        name: string;
        profile: string;
        avatar?: string;
        url?: string;
    };

    media: Array<PostMedia>;

    pinned?: boolean;
};

export type PostMedia = {
    type: "image" | "video" | "card"
    url: string
    preview?: string
    alt?: string
    size?: [number,number]
}


/**
 * Mastodon types. We only model what is important for us
 */

export type MastodonStatus = {
    id: string;
    account: MastodonAccount;
    created_at: string;
    content: string;
    edited_at?: string;
    emojis: Array<MastodonEmoji>;
    in_reply_to_account_id?: string | null;
    in_reply_to_id?: string | null;
    language?: string | null;
    media_attachments: Array<MastodonMediaAttachment>;
    card?: MastodonCard,
    reblog?: MastodonStatus | null;
    sensitive: boolean;
    spoiler_text?: string | null;
    tags: Array<MastodonTag>;
    uri: string;
    url?: string | null;
    visibility: 'direct' | 'private' | 'public' | 'unlisted';
}

export type MastodonAccount = {
    id: string;
    username: string;
    acct: string;
    avatar: string;
    avatar_static: string;
    bot: boolean;
    created_at: string;
    discoverable?: boolean;
    display_name: string;
    emojis: Array<MastodonEmoji>;
    limited?: boolean;
    locked: boolean;
    moved?: MastodonAccount;
    noindex?: boolean;
    suspended?: boolean;
    url: string;
}

export type MastodonEmoji = {
    shortcode: string;
    static_url: string;
    url: string;
}

export type MastodonTag = {
    name: string;
    url: string;
}

export type MastodonMediaAttachment = {
    id: string;
    type: 'image' | 'audio' | 'video' | 'gifv' | 'unknown';
    blurhash?: string | null;
    description?: string | null;
    preview_url: string;
    url: string;
}

export type MastodonCard = {
    url: string;
    title: string;
    description: string;
    language: string;
    type: string;
    author_name: string;
    author_url: string;
    provider_name: string;
    provider_url: string;
    html: string;
    width: number;
    height: number;
    image: string;
    image_description: string;
    embed_url: string;
    blurhash: string | null;
    published_at?: any
}