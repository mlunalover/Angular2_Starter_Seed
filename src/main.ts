import {bootstrap} from "@angular/platform-browser-dynamic";
import {Injector} from "@angular/core";
import {ServiceConfig, getAppProviderConfig} from "./services";
import {MainComponent} from "./components/main/component";

// The root component's injector
export var rootInjector:Injector;


function startApp(appComponentType:any, allProviders:any[]){
    bootstrap(appComponentType, allProviders).then(appRef => {
        rootInjector = appRef.injector;
    });
}

export function main(options:{
    appComponentType:any,
    providerConfig:ServiceConfig,
    customProviders?:any[],
}) {
    var appComponentType = options.appComponentType;
    var customProviders = options.customProviders || [];
    var providerConfig = options.providerConfig;

    var allProviders = providerConfig.providers.concat(customProviders);

    startApp(appComponentType, allProviders);
}

main({
    appComponentType: MainComponent,
    providerConfig: getAppProviderConfig(),
    customProviders: []
});
