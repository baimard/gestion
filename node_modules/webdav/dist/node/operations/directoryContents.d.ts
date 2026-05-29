import { FileStat, GetDirectoryContentsOptionsWithDetails, GetDirectoryContentsOptionsWithoutDetails, ResponseDataDetailed, WebDAVClientContext } from "../types.js";
export declare function getDirectoryContents(context: WebDAVClientContext, remotePath: string): Promise<Array<FileStat>>;
export declare function getDirectoryContents(context: WebDAVClientContext, remotePath: string, options: GetDirectoryContentsOptionsWithDetails): Promise<ResponseDataDetailed<Array<FileStat>>>;
export declare function getDirectoryContents(context: WebDAVClientContext, remotePath: string, options?: GetDirectoryContentsOptionsWithoutDetails): Promise<Array<FileStat>>;
