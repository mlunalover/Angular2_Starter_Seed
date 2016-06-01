import {JSONP_PROVIDERS, HTTP_PROVIDERS} from "@angular/http";
import {FORM_PROVIDERS} from "@angular/common";
import {ROUTER_PROVIDERS} from "@angular/router-deprecated";

let COMMON_PROVIDERS:any[] = [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    FORM_PROVIDERS,
    JSONP_PROVIDERS,
];


export interface ServiceConfig {
    providers:any[];
}

export function getAppProviderConfig():ServiceConfig {
    return {
        providers: COMMON_PROVIDERS
    };
}
