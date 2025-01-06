import { initOptions } from "./types/types";
export declare function getSyncSiteMetadata(metaData?: initOptions["metaData"]): {
    url: string;
    hostname: string;
    name: string;
    icon: String;
    direct_link: string;
    description: string;
};
/**
 * Get site metadata.
 *
 * @returns The site metadata.
 */
export declare function getSiteMetadata(): Promise<{
    hostname: string;
    name: string;
    icon: string;
}>;
