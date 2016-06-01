import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {HomeComponent} from "../home/component";
import {AboutComponent} from "../about/component";

/*
 * This is an entry-point (main) component to be used for our data dashboard partners.
 */
@Component({
    selector: 'main',
    template: `
        <div id="main">
              <div class="container">
                <router-outlet></router-outlet>
             </div>
        </div>
    `,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'Home', component: HomeComponent, useAsDefault: true},
    {path: '/about', name: 'About', component: AboutComponent}
])
export class MainComponent {

    constructor() {
    }

}
